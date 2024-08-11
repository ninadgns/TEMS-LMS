// Nafisa_Binte_Reza 5
// Labiba_Binte_Fazlay_Rabbee 2
// Wadi_Rahman 5
// Aaron_Wajeed_Kaisar 1
// Prokrity_Biswas 5
// Ehan_Abrad_Rahman 3

// Nafisa_Binte_Reza 5
// Prokrity_Biswas 5
// Wadi_Rahman 5
// Labiba_Binte_Fazlay_Rabbee 2
// Aaron_Wajeed_Kaisar 1
// Ehan_Abrad_Rahman 3
 export const AllStudents = ["Aaron","Abdul Qayyum","Abid Asef Zaman","Abrar Faiaz","Abrar Jahin","Abrar Zaheen Suham","Abrar Zahin Pathan","Affan Siam","Ahnaf Habib","Ahnaf Hasan","Ahnaf Reza","Ahnaf Tajwar","Ahon Banik","Aitijhya paul","Ali Abrar Maheer","Alveena Iqbal","Amlan Kumar Nag","Araf Jilani Raif","Arisha Mehnoor","Aritra Saha","Arman Malik","Ashfaque Raiyan","Aynun Nayeem Mazumder","Azmain Sami","B M Tawquir Zaman","B M Tisham Faiyaz","Badhan Kundu","Baezid Ahmed Siraji","Bareerah Mostakhar","Ehan Abrad Rahman","Erfan Nur Mohan","Faiyaz Ahnaf","Faraaz Ibtisham","Farhan Abed Aiman","Farhan Ahmed ","Farhan Ishtiaque Ahmed","Firunavo Saha Trian","Hasin Rayhan Arik","Ilmul Islam Nitto","Irtysh Zayed Liam","Ishmaam Rameev Ahmed","Ishteef Azam Ahmed","Jannat E Nur Daina","Jayed Bin Jahangir","Kazi Maliha Hossain","Kazi Urbana ","Krish Kinjol Chowdhury","Mahjuj Marshad","Mahthir Marshad","Manha Islam","Marjana Manha","Marshad Uddin","Mazir Hossain","Md Ahnaf Habib","Md Fahim Shahriar","Md Mahmudur Rahman","Md Marzuk Anam","Md Mayaseen Mayan","Md Mustasir Uddin Khan","MD Nabeeh Hasan","MD Nabeeh Hossain","Md Razeen Rahman","Md Safwan Bin Raja Rahik","Md Samin","Md Tahmid Hasan Khan Nasif","Mehrab Al Hossain Authoi","Mehrab Hasan Ovi","Mirza Favian Hasan","Mohammad Ismail","Mohammad Samius Sakib","Muhammad Saad","Munjirul Alam","Muntaha Manha","Musanna Sawky","Nabil Taseen Shyan","Namia Rauzat","Nawshad Zaman","Nishat Tasnim","Nuban Sami Alam","Nuhat Habib","Nur Saad","Nuraz Mansur Chowdhury","Nuraz Mihran","Om Auvro Chowdhury","Prokrity Biswas","Purnab Kumar Chakrabarty ","Rafid Un Naby","Ragib Hasan Adib","Raid Ahmed","Raif Islam Nithar","Raiyan Faruk","Raiyan Nur Dhruba","Rayed Ahsan","Rayed Ahsan Ehan","Rayed Al Islam Saif","Razeen Rahman","Ritvik Joaddar","Rumia Islam Juhi","Rushama Nowrozi Aroshi","Rushan Mahmud Tarif","Sabir Ibn Shakhawat","Sadat Islam Khan","Sadman Shadid","Safuan Nur Anan","Saifan Sawad","Salman Kader Abdullah","Shadman Sadiq","Shahir Zawad","Shaikh Ahnaf Yousha","Shayaan Kabir","Shotodol Bhowmik","Shuvro Anindya Bapari","Simanto Biswas Authoi","Sindid Alam","SK Nafeun Islam","SK Raya Anum","Soibam Ngamthoiba Moirang","Soibam Sanathoi Moirang","Sourborna Chandra Chandra","Spondon Balo","Sukanya Malik Titli","Tahmeed Al Asad","Tahmid Hasan Khan Nasif","Tajim Ahmed","Tajrian Tofail","Tamzeed Al Asad","Tarif Hasan","Tazbiq Hossain","Tazim Ahmed","Tirtha talukder","Wahida Binte Jahangir","Yafid Raiyan","Zayan Anjumul Huq","Zayed Bin Jahangir","Zul Kaifil Muqsit"]
type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export type Mark = {
  name: string
  mark: number
  position: number
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
]

export const marks: Mark[] = [
  {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  }, {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  }, {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  }, {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  }, {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  }, {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  }, {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  }, {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  }, {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  }, {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  }, {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  }, {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  }, {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  }, {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  }, {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  }, {
    name: "Pathan",
    mark: 50,
    position: 1
  },
  {
    name: "Tahmid",
    mark: 40,
    position: 2
  },
  {
    name: "Ariq",
    mark: 30,
    position: 3
  },

]
