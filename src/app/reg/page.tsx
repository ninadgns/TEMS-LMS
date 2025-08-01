"use client"
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

// Add the Student interface definition
interface Student {
  'Full Name of Student(English)': string;
  'Full Name of Student(বাংলা)': string;
  'Class in 2025': string;
  'Institution Name': string;
  'Math Batch Name [Primary]'?: string;
  'Math Batch Name [Junior]'?: string;
  'Math Batch Name [Secondary]'?: string;
  'Math Batch Name [Higher Secondary]'?: string;
  'Science Batch Name [Primary]'?: string;
  'Science Batch Name [Junior]'?: string;
  'Science Batch Name [Secondary]'?: string;
  'Science Batch Name [Higher Secondary]'?: string;
  'Chess Batch Name'?: string;
  [key: string]: any; // For any additional columns
}

export default function Home() {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [availableBatches, setAvailableBatches] = useState<string[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [showResults, setShowResults] = useState(false);

  const subjects = [
    { value: 'Math', label: 'Math' },
    { value: 'Science', label: 'Science' },
    { value: 'Chess', label: 'Chess' }
  ];

  const categories = [
    { value: 'Primary', label: 'Primary' },
    { value: 'Junior', label: 'Junior' },
    { value: 'Secondary', label: 'Secondary' },
    { value: 'Higher Secondary', label: 'Higher Secondary' }
  ];

  useEffect(() => {
    const loadCsvFile = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch from public folder - Next.js serves files from public/ at root URL
        const response = await fetch('/tems.csv');
        if (!response.ok) {
          throw new Error(`Failed to load CSV file: ${response.status} ${response.statusText}`);
        }
        
        const csvText = await response.text();
        console.log('CSV file loaded successfully');
        console.log(csvText)
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true, // Skip empty lines
          complete: (results: { errors: string | any[]; data: any[]; }) => {
            if (results.errors.length > 0) {
              console.error('CSV parsing errors:', results.errors);
              setError('Error parsing CSV file');
            } else {
              const validData = results.data.filter((row: any) => 
                row['Full Name of Student(English)'] && 
                row['Full Name of Student(English)'].trim() !== ''
              );
              setData(validData as Student[]);
              console.log(`CSV file loaded successfully! Total records: ${validData.length}`);
            }
            setLoading(false);
          },
          error: (error: { message: any; }) => {
            console.error('Papa Parse error:', error);
            setError(`Error reading CSV: ${error.message}`);
            setLoading(false);
          }
        });
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Error loading CSV file: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setLoading(false);
      }
    };

    loadCsvFile();
  }, []);

  const getColumnName = (subject: string, category: string) => {
    if (subject === 'Chess') {
      return 'Chess Batch Name';
    }
    return `${subject} Batch Name [${category}]`;
  };

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
    setSelectedCategory('');
    setSelectedBatch('');
    setAvailableBatches([]);
    setShowResults(false);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedBatch('');
    setShowResults(false);

    if (!selectedSubject || !data.length) return;

    const columnName = getColumnName(selectedSubject, category);
    
    // Get unique batch names
    const batches = data
      .map(row => row[columnName])
      .filter(batch => batch && batch.trim() !== '')
      .filter((batch, index, arr) => arr.indexOf(batch) === index)
      .sort();

    setAvailableBatches(batches);
  };

  const handleBatchChange = (batch: string) => {
    setSelectedBatch(batch);
    
    if (!selectedSubject || !batch || !data.length) return;

    const category = selectedSubject === 'Chess' ? 'All Classes' : selectedCategory;
    const columnName = getColumnName(selectedSubject, category);
    
    const filtered = data.filter(student => student[columnName] === batch);
    setFilteredStudents(filtered);
    setShowResults(true);
  };

  const resetForm = () => {
    setSelectedSubject('');
    setSelectedCategory('');
    setSelectedBatch('');
    setAvailableBatches([]);
    setFilteredStudents([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
            TEMS Student Registration Status Finder
          </h1>

          {/* Loading/Error Status */}
          <div className="mb-8">
            {loading && <p className="text-blue-600">Loading student data...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {data.length > 0 && (
              <p className="text-green-600">
                ✓ Student data loaded successfully! Total records: {data.length}
              </p>
            )}
          </div>

          {data.length > 0 && (
            <>
              {/* Subject Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  1. Select Subject
                </label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  {subjects.map((subject) => (
                    <button
                      key={subject.value}
                      onClick={() => handleSubjectChange(subject.value)}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        selectedSubject === subject.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {subject.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Selection (for Math and Science) */}
              {selectedSubject && selectedSubject !== 'Chess' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    2. Select {selectedSubject} Category
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => handleCategoryChange(category.value)}
                        className={`p-3 rounded-lg border-2 text-center transition-colors ${
                          selectedCategory === category.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Auto-load batches for Chess */}
              {selectedSubject === 'Chess' && !selectedCategory && (
                <div className="hidden">
                  {(() => {
                    setTimeout(() => handleCategoryChange('All Classes'), 0);
                    return null;
                  })()}
                </div>
              )}

              {/* Batch Selection */}
              {availableBatches.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    3. Available {selectedSubject} Batches 
                    {selectedSubject !== 'Chess' && ` for ${selectedCategory}`}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {availableBatches.map((batch, index) => (
                      <button
                        key={index}
                        onClick={() => handleBatchChange(batch)}
                        className={`p-3 rounded-lg border-2 text-center transition-colors ${
                          selectedBatch === batch
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {batch}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {showResults && (
                <div className="bg-gray-50 rounded-lg p-6 mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Students in {selectedSubject} - {selectedSubject === 'Chess' ? 'All Classes' : selectedCategory} - {selectedBatch}
                    </h2>
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Search Again
                    </button>
                  </div>
                  
                  {filteredStudents.length === 0 ? (
                    <p className="text-gray-600">No students found for this selection.</p>
                  ) : (
                    <>
                      <p className="text-lg font-medium text-gray-700 mb-4">
                        Total Students: {filteredStudents.length}
                      </p>
                      <div className="space-y-4">
                        {filteredStudents.map((student, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg border">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">
                                  {index + 1}. {student['Full Name of Student(English)'] || 'N/A'}
                                </h3>
                                {student['Full Name of Student(বাংলা)'] && 
                                 student['Full Name of Student(বাংলা)'] !== 'N/A' && (
                                  <p className="text-gray-600 italic">
                                    ({student['Full Name of Student(বাংলা)']})
                                  </p>
                                )}
                                <div className="mt-2 text-sm text-gray-600">
                                  <span className="font-medium">Class:</span> {student['Class in 2025'] || 'N/A'} 
                                  <span className="mx-2">|</span>
                                  <span className="font-medium">Institution:</span> {student['Institution Name'] || 'N/A'}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}