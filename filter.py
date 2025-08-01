import pandas as pd

def create_filtered_csv():
    """
    Creates a new CSV file with only the columns needed by selector.py,
    removing all personal information.
    """
    
    # Read the original CSV file
    try:
        df = pd.read_csv('tems.csv')
        print(f"Original CSV loaded successfully! Total records: {len(df)}")
    except FileNotFoundError:
        print("tems.csv file not found. Please check the file path.")
        return
    except Exception as e:
        print(f"Error reading CSV: {e}")
        return
    
    # Define the columns needed by selector.py
    required_columns = [
        'Full Name of Student(English)',
        'Full Name of Student(বাংলা)',
        'Class in 2025',
        'Institution Name',
        'Math Batch Name [Primary]',
        'Math Batch Name [Junior]',
        'Math Batch Name [Secondary]',
        'Math Batch Name [Higher Secondary]',
        'Science Batch Name [Primary]',
        'Science Batch Name [Junior]',
        'Science Batch Name [Secondary]',
        'Science Batch Name [Higher Secondary]',
        'Chess Batch Name'
    ]
    
    # Check which required columns exist in the original CSV
    existing_columns = []
    missing_columns = []
    
    for col in required_columns:
        if col in df.columns:
            existing_columns.append(col)
        else:
            missing_columns.append(col)
    
    if missing_columns:
        print(f"Warning: The following required columns are missing from the original CSV:")
        for col in missing_columns:
            print(f"  - {col}")
    
    # Create filtered dataframe with only required columns
    filtered_df = df[existing_columns].copy()
    
    # Remove rows where all batch name columns are empty/null
    batch_columns = [col for col in existing_columns if 'Batch Name' in col]
    if batch_columns:
        # Keep rows that have at least one non-null batch assignment
        filtered_df = filtered_df.dropna(subset=batch_columns, how='all')
    
    # Save the filtered CSV
    output_filename = 'tems_filtered.csv'
    try:
        filtered_df.to_csv(output_filename, index=False)
        print(f"\nFiltered CSV created successfully!")
        print(f"Output file: {output_filename}")
        print(f"Columns included: {len(existing_columns)}")
        print(f"Records in filtered file: {len(filtered_df)}")
        
        # Show summary of batch assignments
        print(f"\nBatch assignment summary:")
        for col in batch_columns:
            non_null_count = filtered_df[col].notna().sum()
            unique_batches = filtered_df[col].dropna().nunique()
            print(f"  {col}: {non_null_count} students, {unique_batches} unique batches")
            
    except Exception as e:
        print(f"Error saving filtered CSV: {e}")

if __name__ == "__main__":
    create_filtered_csv()