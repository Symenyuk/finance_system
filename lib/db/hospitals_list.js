module.exports = (db) => {
    let hospitalsList = [
        {"Healthcare Provider Name":"32 Dental","District":"Central Province","Address 1":"Al Mursalat Dist,","Branch":"King Abdullah Road","Address 3":"PO BOX 51160","City":"Riyadh","Telephone No":{" 1":"112070498"}}
        ,
        {"Healthcare Provider Name":"6/6 Optics","District":"Southren Province","Address 1":"Al Faysaliah Dist","Branch":"King Abdul Aziz St","Address 3":"Box 1237","City":"Najran","Telephone No":{" 1":"175226006"}}
        ,
        {"Healthcare Provider Name":"Aba Al Khel Medical Complex - Al Dawadmi","District":"Central Province","Address 1":"Al Dawadmi Dis .","Branch":"Al Dawadmi General St .","Address 3":"P.O. Box . 15108","City":"Al Dawadmy","Telephone No":{" 1":"114335011"}}
        ,
        {"Healthcare Provider Name":"Abad Specialized Clinics","District":"Central Province","Address 1":"Al Sulaimaniah Dist.","Branch":"Al Ma'athar St.","Address 3":"P.O.Box 8083","City":"Riyadh","Telephone No":{" 1":"112016655"}}
        ,
        {"Healthcare Provider Name":"Aban Opticals","District":"Western Province","Address 1":"Musharefa District","Branch":"Makarona Street","Address 3":"PO Box 5019 Jeddah 21422","City":"Jeddah","Telephone No":{" 1":"126736908"}}
        ,
        {"Healthcare Provider Name":"Abas Dental Clinic","District":"Central Province","Address 1":"Al Murabba Dist","Branch":"Al dhabab St","Address 3":"Po Box 11443","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Abas Medical Center","District":"Central Province","Address 1":".Shaqraa city","Branch":"","Address 3":"","City":"Riyadh","Telephone No":{" 1":"116223233"}}
        ,
        {"Healthcare Provider Name":"Abas Polyclinic 2","District":"Central Province","Address 1":"Al Quds Dist","Branch":"King Abdullah St","Address 3":"Po Box 11537","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Abas Polyclinic 3","District":"Central Province","Address 1":"Al Hamraa Dist","Branch":"Khalid ib al walid St","Address 3":"Po Box 68552","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Abdul Latif Jameel Center for Rehabilitation & Health Care","District":"Western Province","Address 1":"PO Box 114869","Branch":"Al Safa District,","Address 3":"","City":"Jeddah","Telephone No":{" 1":"126770001"}}
        ,
        {"Healthcare Provider Name":"Abdulaziz Al Bishry General Medical Complex","District":"Western Province","Address 1":"Bathaa Quraish","Branch":"Al Sharee Al Aam","Address 3":"P.O Box4740","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Abdullah M. Al Dossary National Polyclinic","District":"Eastern Province","Address 1":"Al Madina District","Branch":"Makka Street","Address 3":"P.O.Box 64","City":"Abqiq","Telephone No":{" 1":"135661608"}}
        ,
        {"Healthcare Provider Name":"Abdulrahman Al Deheishi Physiotherapy Center ( Phyziofit)","District":"Central Province","Address 1":"Al Yasmeen Dis .","Branch":"Al Thomamah st .","Address 3":"P.O.Box . 5920","City":"Riyadh","Telephone No":{" 1":"114822288"}}
        ,
        {"Healthcare Provider Name":"Abdulrahman Moala Al Sahly Medical Complex","District":"Western Province","Address 1":"Al Marwa District","Branch":"PO Box 7238 Jeddah 21462","Address 3":"","City":"Jeddah","Telephone No":{" 1":"126583386"}}
        ,
        {"Healthcare Provider Name":"Abha Private Hospital","District":"Southren Province","Address 1":"King Khalid Street","Branch":"P.O. Box 1794","Address 3":"","City":"Abha","Telephone No":{" 1":"172292222"}}
        ,
        {"Healthcare Provider Name":"Abiat Al Tibb Polyclinic 2","District":"Central Province","Address 1":"King Abdullah Bin Abdelaziz Road","Branch":"Al Hamra Area","Address 3":"P.O. Box11324","City":"Riyadh","Telephone No":{" 1":"112780211"}}
        ,
        {"Healthcare Provider Name":"Abu Al Khair Polyclinic","District":"Western Province","Address 1":"Al Aziziya District","Branch":"Wadi Zam Zam Street","Address 3":"PO Box 8451 Jeddah 21482","City":"Jeddah","Telephone No":{" 1":"126749797"}}
        ,
        {"Healthcare Provider Name":"Abu Zeed Polyclinic","District":"Central Province","Address 1":"Al Dwadmi","Branch":"the northern district, main street","Address 3":"","City":"Al Dawadmy","Telephone No":{" 1":"116423338"}}
        ,
        {"Healthcare Provider Name":"Abuzinadah Hospital","District":"Western Province","Address 1":"Hail Street","Branch":"P.O. Box 7360","Address 3":"21462","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"adawi Atlas Sagaf Pharmacies","District":"Central Province","Address 1":"Manfuha Dist.","Branch":"Eastern Ring Road - Between Exit 13-14","Address 3":"P.O.Box 4217","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Advanced Clinics - Al Kharj","District":"Central Province","Address 1":"Al Salam Dist","Branch":"King Abdul Aziz St","Address 3":"PO BOX 3033","City":"Al Kharj","Telephone No":{" 1":"115451111"}}
        ,
        {"Healthcare Provider Name":"Adwa Al Hayat Polyclinic Co.","District":"Central Province","Address 1":"Al Batha","Branch":"Al Ghorabi Main Street","Address 3":"PO Box 33007 Riyadh 11373","City":"Riyadh","Telephone No":{" 1":"114040313"}}
        ,
        {"Healthcare Provider Name":"Adwa Al Hikma Dental Center","District":"Eastern Province","Address 1":"Al Nakheel Area","Branch":"King Khalid Street","Address 3":"PO BOX 8435","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Adwaa Al Alami Medical Complex","District":"Central Province","Address 1":"Riyadh District","Branch":"Al Kharj Road, Dawar Al Kharj","Address 3":"PO Box 26317","City":"Riyadh","Telephone No":{" 1":"114486834"}}
        ,
        {"Healthcare Provider Name":"Adwaa Al Alami Polyclinic","District":"Central Province","Address 1":"Al Aziziya Dist","Branch":"PO Box 281188","Address 3":"11392","City":"Riyadh","Telephone No":{" 1":"14954563"}}
        ,
        {"Healthcare Provider Name":"Adwaa Al-Alami Medical Complex - Al Moroj","District":"Central Province","Address 1":"Turki Bin Abdil Aziz Street","Branch":"Al Moroj District","Address 3":"PO Box 21542","City":"Riyadh","Telephone No":{" 1":"114587949"}}
        ,
        {"Healthcare Provider Name":"Adwaa Dorat Al Alami Medical Complex","District":"Central Province","Address 1":"Al Rawda District","Branch":"Khalid Bin Al Wleed Street","Address 3":"","City":"Riyadh","Telephone No":{" 1":"112481400"}}
        ,
        {"Healthcare Provider Name":"Adwaa Segal Dental Center","District":"Eastern Province","Address 1":"Al Tebeishi Dist.","Branch":"Prince Mohammed Bin Fahad St.","Address 3":"","City":"Dammam","Telephone No":{" 1":"138328666"}}
        ,
        {"Healthcare Provider Name":"Aghrass Medical Center","District":"Western Province","Address 1":"Jeddah - Hai Al Qaryat","Branch":"King Khalid St.","Address 3":"P.O. Box. 19435","City":"Jeddah","Telephone No":{" 1":"125111600"}}
        ,
        {"Healthcare Provider Name":"Ahali Al Khorma General Medical Complex","District":"Western Province","Address 1":"Taif - Khorma","Branch":"Al Nozha Dist.","Address 3":"P.O. Box 150","City":"Khorma","Telephone No":{" 1":"128321434"}}
        ,
        {"Healthcare Provider Name":"Ain Al Hayat Polyclinic","District":"Northen Province","Address 1":"Almasif 3 Dist","Branch":"","Address 3":"","City":"Tabuk","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Ainy Ainak Optical","District":"Western Province","Address 1":"Al Thaghar District","Branch":"Old Makkah Road","Address 3":"PO Box 120607 Jeddah 21322","City":"Jeddah","Telephone No":{" 1":"126333118"}}
        ,
        {"Healthcare Provider Name":"Ajial Medical Center","District":"Central Province","Address 1":"Hisham Bin Abd Al Malek Street,","Branch":"King Fahd District","Address 3":"P O Box No 16327","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Ajyad Medical Services Co.","District":"Eastern Province","Address 1":"2903 King Faisal Street,","Branch":"Unit 30, Al Tubashi Dis.","Address 3":"PO Box 35115 Dammam 31488","City":"Dammam","Telephone No":{" 1":"138056444"}}
        ,
        {"Healthcare Provider Name":"Al Abeer Clinic - Batha","District":"Central Province","Address 1":"Batha Main Street,","Branch":"","Address 3":"","City":"Riyadh","Telephone No":{" 1":"114091064"}}
        ,
        {"Healthcare Provider Name":"Al Abeer Clinic - Bawadi","District":"Western Province","Address 1":"Bawadi District, King Fahd St,","Branch":"PO box 52868","Address 3":"Jeddah 21573","City":"Jeddah","Telephone No":{" 1":"126395444"}}
        ,
        {"Healthcare Provider Name":"Al Abeer Clinic - Madina","District":"Northen Province","Address 1":"Al Raya District","Branch":"Othman Bin Afan Street","Address 3":"","City":"Madina","Telephone No":{" 1":"148268664"}}
        ,
        {"Healthcare Provider Name":"Al Abeer Clinic - Makkah","District":"Western Province","Address 1":"Al Aziziah District,","Branch":"","Address 3":"","City":"Makkah","Telephone No":{" 1":"125665656"}}
        ,
        {"Healthcare Provider Name":"Al Abeer Clinic - Manfuha","District":"Central Province","Address 1":"Al Farian Street,","Branch":"","Address 3":"","City":"Riyadh","Telephone No":{" 1":"14596424"}}
        ,
        {"Healthcare Provider Name":"Al Abeer Clinic - Sharafiah","District":"Western Province","Address 1":"Khalid Bin Al Walid Street","Branch":"P.O. Box 52868","Address 3":"21573","City":"Jeddah","Telephone No":{" 1":"126573001"}}
        ,
        {"Healthcare Provider Name":"Al Abeer Clinic - Shumaisy","District":"Central Province","Address 1":"Ummusalim Roundabout,","Branch":"","Address 3":"","City":"Riyadh","Telephone No":{" 1":"14133103"}}
        ,
        {"Healthcare Provider Name":"Al Abeer Medical Center - Azizia","District":"Western Province","Address 1":"PO Box 52868","Branch":"Al Aziziz District","Address 3":"Al Sahafah Street","City":"Jeddah","Telephone No":{" 1":"126174545"}}
        ,
        {"Healthcare Provider Name":"Al Abeer Polyclinic - Industrial Area","District":"Western Province","Address 1":"Industrial Area - Phase 3","Branch":"P.O. Box 52868","Address 3":"21573","City":"Jeddah","Telephone No":{" 1":"126080326"}}
        ,
        {"Healthcare Provider Name":"Al Abeer Supreme Medical Center 2","District":"Central Province","Address 1":"King Faisal Dist.","Branch":"Abi Saeed Al Khudari St.","Address 3":"P.O.Box. 5488","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Abeer Zahrat Medical Polyclinic - Dammam","District":"Eastern Province","Address 1":"Al Khaleej Dist.","Branch":"AlRabaa\" St.","Address 3":"P.O.Box. 63587","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Ablan Medical Complex","District":"Eastern Province","Address 1":"Al Faisaliah Dist","Branch":"Abo Qaar St","Address 3":"Box,977","City":"Hafr Al Batin","Telephone No":{" 1":"137213853"}}
        ,
        {"Healthcare Provider Name":"Al Abrag Dental Polyclinic","District":"Central Province","Address 1":"Al Swaidi Dist,","Branch":"Aisha Bint Abi Baker St.","Address 3":"PO BOX 34985","City":"Riyadh","Telephone No":{" 1":"114246101"}}
        ,
        {"Healthcare Provider Name":"Al Adwani General Hospital","District":"Western Province","Address 1":"Al Faysaliah Dis, Near NCB","Branch":"P.O. Box 519","Address 3":"","City":"Taif","Telephone No":{" 1":"127340000"}}
        ,
        {"Healthcare Provider Name":"Al Affari Polyclinic","District":"Northen Province","Address 1":"Al Sulimaniya","Branch":"P.O.Box - 55","Address 3":"71411","City":"Tabuk","Telephone No":{" 1":"920010019"}}
        ,
        {"Healthcare Provider Name":"Al Ahli Gen. Medical Complex","District":"Central Province","Address 1":"Sharaf Dist.","Branch":"Al Bouhtri Street","Address 3":"P.O. Box 2268","City":"Hail","Telephone No":{" 1":"165355555"}}
        ,
        {"Healthcare Provider Name":"Al Ahli Hospital - Khamis Mushyat","District":"Southren Province","Address 1":"PO Box 77","Branch":"","Address 3":"","City":"Khamis Mushyat","Telephone No":{" 1":"172350000"}}
        ,
        {"Healthcare Provider Name":"Al Ahmadi Medical Complex","District":"Eastern Province","Address 1":"King Fahd Road, 71 Area","Branch":"Ohod District","Address 3":"PO Box 6886 Dammam 31452","City":"Dammam","Telephone No":{" 1":"138200150"}}
        ,
        {"Healthcare Provider Name":"Al Ahsa Hospital","District":"Eastern Province","Address 1":"Traint Street","Branch":"Infront of Railway Station","Address 3":"Hofuf","City":"Al Hasa","Telephone No":{" 1":"135844000"}}
        ,
        {"Healthcare Provider Name":"Al Ajaj Clinic (Qrayat)","District":"Northen Province","Address 1":"P.O. Box 192","Branch":"","Address 3":"","City":"Qrayat","Telephone No":{" 1":"146420011"}}
        ,
        {"Healthcare Provider Name":"Al Ajaji Medical Complex","District":"Central Province","Address 1":"Al Maseef Dist.","Branch":"Dabyah bint Al Baraa","Address 3":"P.O.Box. 28060","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Ajaji Optical Group","District":"Central Province","Address 1":"King Abdullah Street","Branch":"PO Box 1489","Address 3":"Buraidah 81999","City":"Bureidah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Alam Medical Company","District":"Central Province","Address 1":"PO Box 104444","Branch":"11626","Address 3":"","City":"Riyadh","Telephone No":{" 1":"112783330"}}
        ,
        {"Healthcare Provider Name":"Al Alameya Polyclinic","District":"Western Province","Address 1":"Al Nahdah Dist , Prince Sultan St","Branch":"P.O.Box 23837","Address 3":"21436","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Amal Dental Clinic","District":"Southren Province","Address 1":"Al Amal dental clinic samtah","Branch":"Samtah Dawn town city","Address 3":"Al wasat district P.O box 67","City":"Samtah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Amal Dispensary (Bisha)","District":"Southren Province","Address 1":"Al Roshan Dist, Al Modara Building","Branch":"North Government Build","Address 3":"PO Box 3","City":"Bisha","Telephone No":{" 1":"176226900"}}
        ,
        {"Healthcare Provider Name":"Al Amal General Medical Complex","District":"Northen Province","Address 1":"Main St.","Branch":"Al Mahd Province","Address 3":"P.O.Box 32","City":"Madina","Telephone No":{" 1":"148681372"}}
        ,
        {"Healthcare Provider Name":"Al Amal Medical Group","District":"Western Province","Address 1":"Al Semeri Dist, Yanbu Indstrial","Branch":"Al Hezam Street","Address 3":"PO BOX 30530","City":"Yanbu","Telephone No":{" 1":"143212000"}}
        ,
        {"Healthcare Provider Name":"Al Amal National Clinic - Ahad Al Masarha","District":"Southren Province","Address 1":"Ahad Al Masarha District","Branch":"Khiatin Street","Address 3":"","City":"Ahad Al Masarha","Telephone No":{" 1":"173193333"}}
        ,
        {"Healthcare Provider Name":"Al Amal National Polyclinic","District":"Central Province","Address 1":"Manfoha District","Branch":"20th Street","Address 3":"PO Box 674 Riyadh 11421","City":"Riyadh","Telephone No":{" 1":"114592953"}}
        ,
        {"Healthcare Provider Name":"Al Amal National Polyclinic 2","District":"Central Province","Address 1":"P O Box 674","Branch":"Riyadh - 11421","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Amal National Polyclinic 2","District":"Central Province","Address 1":"P O Box 674","Branch":"Riyadh - 11421","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Amal Polyclinic - Yanbu Al Bahar","District":"Western Province","Address 1":"Al Hadaieq Dist","Branch":"Al Khazan street","Address 3":"","City":"","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Amal Polyclinic (Rabigh)","District":"Western Province","Address 1":"Main Street","Branch":"P.O. Box 195","Address 3":"21911","City":"Rabigh","Telephone No":{" 1":"124222916"}}
        ,
        {"Healthcare Provider Name":"Al Ameed Medical Polyclinic","District":"Central Province","Address 1":"King Fahad - Al Salam District","Branch":"PO Box 174","Address 3":"11942","City":"Al Kharj","Telephone No":{" 1":"115443377"}}
        ,
        {"Healthcare Provider Name":"Al Amen Hospital","District":"Western Province","Address 1":"P.O. Box 685","Branch":"Al Salama Dist. King Fisal St.","Address 3":"","City":"Taif","Telephone No":{" 1":"127366100"}}
        ,
        {"Healthcare Provider Name":"Al Amin Clinic 1","District":"Central Province","Address 1":"Al Shifa District, Dirab Street,","Branch":"P.O. Box 15641","Address 3":"Riyadh 11454","City":"Riyadh","Telephone No":{" 1":"114215656"}}
        ,
        {"Healthcare Provider Name":"Al Amin Clinic 1","District":"Central Province","Address 1":"Al Shifa District, Dirab Street,","Branch":"P.O. Box 15641","Address 3":"Riyadh 11454","City":"Riyadh","Telephone No":{" 1":"114215656"}}
        ,
        {"Healthcare Provider Name":"Al Andalus Dental Center - Madinah","District":"Northen Province","Address 1":"Al Madinah, Al Kurdi District","Branch":"PO Box 3706 Madinah 41481","Address 3":"","City":"Madina","Telephone No":{" 1":"148151444"}}
        ,
        {"Healthcare Provider Name":"Al Andalus Polyclinic","District":"Western Province","Address 1":"Shahar Dist","Branch":"Rudaf Road","Address 3":"Box 25008","City":"Taif","Telephone No":{" 1":"127405000"}}
        ,
        {"Healthcare Provider Name":"Al Ansari Specialist Hospital","District":"Western Province","Address 1":"Al Jabriyah Area(Yanbu Al Sinaiyah)","Branch":"P.O. Box 30894","Address 3":"","City":"Yanbu","Telephone No":{" 1":"143926444"}}
        ,
        {"Healthcare Provider Name":"Al Ansari Vision Group -","District":"Western Province","Address 1":"A/8 District","Branch":"Mohammad Bin Abdl Wahab Street","Address 3":"PO Box: 30894","City":"Yanbu","Telephone No":{" 1":"143910708"}}
        ,
        {"Healthcare Provider Name":"Al Anwar Medical Company","District":"Central Province","Address 1":"King Faisl Street, Al Aziziah","Branch":"P.O. Box 1380","Address 3":"","City":"Hail","Telephone No":{" 1":"165332222"}}
        ,
        {"Healthcare Provider Name":"Al Aqeeq Medical Center","District":"Northen Province","Address 1":"Al Khatem Dist","Branch":"Prince Abdulmajeed St","Address 3":"PO BOX 7522","City":"Madina","Telephone No":{" 1":"148645511"}}
        ,
        {"Healthcare Provider Name":"Al Aqsa Medical Polyclinic","District":"Western Province","Address 1":"Al Nuzha Dist","Branch":"North of Makarounh st","Address 3":"ntersection of Makarounah with Heraa","City":"Jeddah","Telephone No":{" 1":"126541229"}}
        ,
        {"Healthcare Provider Name":"Al Arjan Medical Polyclinic","District":"Northen Province","Address 1":"Prince Sultan Bin Abdulaziz","Branch":"Building No. 4027 - Olaya 2","Address 3":"PO Box. 7702","City":"Tabuk","Telephone No":{" 1":"144430000"}}
        ,
        {"Healthcare Provider Name":"Al Arkan Polyclinic","District":"Southren Province","Address 1":"Al Nomeis Dist.","Branch":"The Main Street","Address 3":"PO Box 1018","City":"Abha","Telephone No":{" 1":"172282727"}}
        ,
        {"Healthcare Provider Name":"Al Ashiri National Polyclinic","District":"Southren Province","Address 1":"Main Street","Branch":"Genaral District","Address 3":"P O Box 46","City":"Ghonfodah","Telephone No":{" 1":"177460700"}}
        ,
        {"Healthcare Provider Name":"Al Atfain New Polyclinic ( Najran )","District":"Southren Province","Address 1":"Al-Faisaliah District","Branch":"King Abdulaziz Street","Address 3":"P.O. Box 456","City":"Najran","Telephone No":{" 1":"175230851"}}
        ,
        {"Healthcare Provider Name":"Al Atfain Typical Polyclinic","District":"Northen Province","Address 1":"Al Olaya District,","Branch":"P.O. Box 456","Address 3":"","City":"Tabuk","Telephone No":{" 1":"144229192"}}
        ,
        {"Healthcare Provider Name":"Al Audah Medical Center","District":"Eastern Province","Address 1":"Al Baladiah Dist. Qutibah bin muslim St.","Branch":"Beside hafr al batin court","Address 3":"Box:109","City":"Hafr Al Batin","Telephone No":{" 1":"137248811"}}
        ,
        {"Healthcare Provider Name":"Al Ausrah Clinic - Taif","District":"Western Province","Address 1":"Al Shohada'a Al Shmaleya","Branch":"Al Ghzale Street","Address 3":"PO Box 1562 Taif 21944","City":"Taif","Telephone No":{" 1":"127466980"}}
        ,
        {"Healthcare Provider Name":"Al Azhar Hospital","District":"Central Province","Address 1":"Al Nasim District, Ibn Horayra Street,","Branch":"P.O. Box 276619","Address 3":"Riyadh 11314","City":"Riyadh","Telephone No":{" 1":"12366788"}}
        ,
        {"Healthcare Provider Name":"Al Azhar Medical Polyclinic - Qunfudah","District":"Southren Province","Address 1":"Al Khaldiyah Dist.","Branch":"Al Siteen St.","Address 3":"P.O.Box 295","City":"Ghonfodah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Azhar Medical Polyclinic - Sabt Al Alaya","District":"Southren Province","Address 1":"Main Road","Branch":"Sabt Al Alaya District","Address 3":"","City":"Bisha","Telephone No":{" 1":"112366788"}}
        ,
        {"Healthcare Provider Name":"Al Aziziah Polyclinic","District":"Western Province","Address 1":"P. O. Box 42075","Branch":"Jeddah -21541","Address 3":"","City":"Jeddah","Telephone No":{" 1":"126701071"}}
        ,
        {"Healthcare Provider Name":"Al Badr Medical Complex","District":"Western Province","Address 1":"Al Adl District- Jabal Al Noor Squer","Branch":"Mohammed Al Jemai Building","Address 3":"PO BOX:90","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Badr Medical Complex - Al Jamom","District":"Western Province","Address 1":"Al Jamom .","Branch":"General St .","Address 3":"P.O.Box . 51870","City":"Makkah","Telephone No":{" 1":"125940071"}}
        ,
        {"Healthcare Provider Name":"Al Badri Polyclinic","District":"Central Province","Address 1":"Imam Saoud Bin Abdul Aziz Street,","Branch":"Al Massif District,","Address 3":"P.O. Box 92234","City":"Riyadh","Telephone No":{" 1":"14509000"}}
        ,
        {"Healthcare Provider Name":"Al Bakkari Medical Polyclinic","District":"Northen Province","Address 1":"Prince Abdul Majeed Street,","Branch":"Opposite to the Civil Defense,","Address 3":"P.O. Box 6231","City":"Madina","Telephone No":{" 1":"148371318"}}
        ,
        {"Healthcare Provider Name":"Al Barakat Hearing Care Center","District":"Central Province","Address 1":"Al Malaz Dist.","Branch":"Salah El Deen St.","Address 3":"POBox 203","City":"Riyadh","Telephone No":{" 1":"114722677"}}
        ,
        {"Healthcare Provider Name":"Al Barakat Optical","District":"Central Province","Address 1":"Malaz District, Int. of Salah PO Box 203","Branch":"Riyadh 11411","Address 3":"","City":"Riyadh","Telephone No":{" 1":"14722677"}}
        ,
        {"Healthcare Provider Name":"Al Barrak Medical Complex","District":"Central Province","Address 1":"Al Tweeq District","Branch":"Khadija Bint Khowyled Street","Address 3":"PO Box 50065 Riyadh 11523","City":"Riyadh","Telephone No":{" 1":"112620407"}}
        ,
        {"Healthcare Provider Name":"Al Bashawri Optical - Dammam","District":"Eastern Province","Address 1":"Al Dawaser Dist","Branch":"Al Dahran Street","Address 3":"PO BOX 811","City":"Dammam","Telephone No":{" 1":"138350024"}}
        ,
        {"Healthcare Provider Name":"Al Bashawri Optical - Jeddah","District":"Western Province","Address 1":"Jeddah","Branch":"P.O. Box 2000","Address 3":"Jeddah - 21441","City":"Jeddah","Telephone No":{" 1":"126976742"}}
        ,
        {"Healthcare Provider Name":"Al Bashawri Optical - Madinah","District":"Northen Province","Address 1":"Madinal Munawara","Branch":"","Address 3":"","City":"Madina","Telephone No":{" 1":"148229577"}}
        ,
        {"Healthcare Provider Name":"Al Bashawri Optical - Makkah","District":"Western Province","Address 1":"Makkah","Branch":"P.O.BOX 2914","Address 3":"","City":"Makkah","Telephone No":{" 1":"126420125"}}
        ,
        {"Healthcare Provider Name":"Al Bashawri Optical - Riyadh","District":"Central Province","Address 1":"Riyadh","Branch":"Batha, Main Street,OppIbn Sulman Center","Address 3":"P.O.Box 3478","City":"Riyadh","Telephone No":{" 1":"114135121"}}
        ,
        {"Healthcare Provider Name":"Al Bati Dispensary","District":"Eastern Province","Address 1":"District 19, Tarout Main Street","Branch":"P.O. Box 511","Address 3":"31911","City":"Qatif","Telephone No":{" 1":"138233363"}}
        ,
        {"Healthcare Provider Name":"Al Bayan Medical Complex","District":"Central Province","Address 1":"Manfoha District","Branch":"60th Street","Address 3":"Prince Mohammed Bin Abdulrahman Road","City":"Riyadh","Telephone No":{" 1":"114510944"}}
        ,
        {"Healthcare Provider Name":"Al Bayt Medical Center","District":"Western Province","Address 1":"Ajyad District, Al Bayt Towers","Branch":"P.O. Box 24610","Address 3":"21456","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Bilad Medical Center","District":"Central Province","Address 1":"Manfoha, Al Faryan Street","Branch":"PO Box 52030 Riyadh 11563","Address 3":"","City":"Riyadh","Telephone No":{" 1":"114595913"}}
        ,
        {"Healthcare Provider Name":"Al Bishri Medical Complex - Rabigh","District":"Western Province","Address 1":"Electricity Road","Branch":"P.O. Box -8, Jeddah 21951","Address 3":"","City":"Rabigh","Telephone No":{" 1":"122652999"}}
        ,
        {"Healthcare Provider Name":"Al Bishri Medical Complex - Thowal","District":"Western Province","Address 1":"Thowal, Main Street,","Branch":"Next To The Police Station","Address 3":"P.O. Box -8, Jeddah 21951","City":"Jeddah","Telephone No":{" 1":"122652999"}}
        ,
        {"Healthcare Provider Name":"Al Borg Medical Laboratories","District":"Western Province","Address 1":"Al Khayat Tower","Branch":"Madinah Road","Address 3":"PO Box 52817","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Bustan Medical Complex","District":"Central Province","Address 1":"Al Hejaz Al Aam Street","Branch":"Yamama District","Address 3":"P. O. Box 30924","City":"Riyadh","Telephone No":{" 1":"114582140"}}
        ,
        {"Healthcare Provider Name":"Al Dakhel Polyclinic","District":"Northen Province","Address 1":"King Fahad Road","Branch":"P.O. Box 1403","Address 3":"","City":"Tabuk","Telephone No":{" 1":"014 422 7607"}}
        ,
        {"Healthcare Provider Name":"Al Dar Hospital - Quba","District":"Northen Province","Address 1":"Al Hijra Road","Branch":"Quba","Address 3":"PO Box 167","City":"Madina","Telephone No":{" 1":"148677777"}}
        ,
        {"Healthcare Provider Name":"Al Dawa Al Methaly Pharmacy","District":"Eastern Province","Address 1":"Northern Ahsa Dist.","Branch":"Al Bekeiriyah 2 St.","Address 3":"POBox 31481","City":"Jubail","Telephone No":{" 1":"133470054"}}
        ,
        {"Healthcare Provider Name":"Al Dawa Company for Medical Services Limited","District":"Eastern Province","Address 1":"Al Aqrabiah Dist","Branch":"Street 25","Address 3":"PO BOX 4326","City":"Khobar","Telephone No":{" 1":"138677776"}}
        ,
        {"Healthcare Provider Name":"Al Dhawi Polyclinic","District":"Central Province","Address 1":"Al Rawda Dist","Branch":"Al Hassan Bin Ali","Address 3":"PO BOX 52608","City":"Riyadh","Telephone No":{" 1":"114760803"}}
        ,
        {"Healthcare Provider Name":"Al Diriaya Polyclinic","District":"Central Province","Address 1":"Al Diriaya Area,","Branch":"Al Thalatheen Street","Address 3":"PO BOX 70306","City":"Al Diriaya","Telephone No":{" 1":"114860040"}}
        ,
        {"Healthcare Provider Name":"Al Doha Medical Clinic","District":"Eastern Province","Address 1":"South Doha Dis, Abdullah Abbas St,","Branch":"","Address 3":"PO Box 839","City":"Dahran","Telephone No":{" 1":"138913111"}}
        ,
        {"Healthcare Provider Name":"Al Dosary Medical Polyclinic","District":"Central Province","Address 1":"Al Aziziyah District","Branch":"King Faisal Street","Address 3":"PO Box 1494 Kharj 11942","City":"Al Kharj","Telephone No":{" 1":"115482039"}}
        ,
        {"Healthcare Provider Name":"Al Duliman Optics - Al Khafji","District":"Eastern Province","Address 1":"King Fahed Dist","Branch":"King Abdul Aziz Street","Address 3":"PO BOX 14322","City":"Khafji","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Eman Medical Clinic","District":"Central Province","Address 1":"New Al Manfouha Dist,","Branch":"Al Manfouha Main Street","Address 3":"PO BOX 3907","City":"Riyadh","Telephone No":{" 1":"14582070"}}
        ,
        {"Healthcare Provider Name":"Al Emeis Hospital","District":"Southren Province","Address 1":"Al Wasat, Al Matar Dist.","Branch":"P.O.Box 868","Address 3":"","City":"Gizan","Telephone No":{" 1":"173226633"}}
        ,
        {"Healthcare Provider Name":"Al Emeis Medical Complex - Ahad Rufaida","District":"Southren Province","Address 1":"Bin Saman Dist","Branch":"King Khalid Road","Address 3":"PO BOX 40","City":"Ahad Rufaidah","Telephone No":{" 1":"172506633"}}
        ,
        {"Healthcare Provider Name":"Al Emeis Medical Complex - Khamis Mushyat","District":"Southren Province","Address 1":"Al Emais Medical Complex Khamis Mushyat","Branch":"Khamis Mushyat 61961","Address 3":"PO box 1595","City":"Khamis Mushyat","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Emeis National Hospital","District":"Southren Province","Address 1":"P.O. Box 9 - Zip code: 11211","Branch":"","Address 3":"","City":"Sabya","Telephone No":{" 1":"173266633"}}
        ,
        {"Healthcare Provider Name":"Al Enjaz Medical Center","District":"Central Province","Address 1":"Al Ain Dist.","Branch":"Main St.","Address 3":"B.O.Box 5","City":"Riyadh","Telephone No":{" 1":"115288000"}}
        ,
        {"Healthcare Provider Name":"Al Ewan Medical Complex","District":"Central Province","Address 1":"Al Sulaimanyah Dist,","Branch":"Tahliah St,Behind Dabab Garden compound","Address 3":"Box 90819","City":"Riyadh","Telephone No":{" 1":"114631606"}}
        ,
        {"Healthcare Provider Name":"Al Faiha Medical Center - Bureidah","District":"Central Province","Address 1":"PO Box 448","Branch":"81999","Address 3":"","City":"Bureidah","Telephone No":{" 1":"163814020"}}
        ,
        {"Healthcare Provider Name":"Al Faiha Medical Center - Riyadh","District":"Central Province","Address 1":"Imam Ahmed Ibn Hanbal Street","Branch":"Al Naseem District","Address 3":"PO Box 120785","City":"Riyadh","Telephone No":{" 1":"112328888"}}
        ,
        {"Healthcare Provider Name":"Al Faiha Medical Center 2","District":"Central Province","Address 1":"Al Faiziyah Dist","Branch":"Siteen St","Address 3":"Box4428","City":"Bureidah","Telephone No":{" 1":"163855070"}}
        ,
        {"Healthcare Provider Name":"Al Faiha Polyclinic - Rafha","District":"Northen Province","Address 1":"40 Street, Al Namozajeya Dist.","Branch":"P O Box 120785","Address 3":"11689","City":"Rafha'a","Telephone No":{" 1":"146764000"}}
        ,
        {"Healthcare Provider Name":"Al Fairouz Al Ahli Clinic","District":"Central Province","Address 1":"Al Shefa Dist","Branch":"Ibn Taimah Street","Address 3":"PO BOX 3092","City":"Riyadh","Telephone No":{" 1":"114239235"}}
        ,
        {"Healthcare Provider Name":"Al Fairoz For Dental Center","District":"Southren Province","Address 1":"Aerysah Dist","Branch":"King Abdul Aziz Road","Address 3":"PO BOX 1210","City":"Najran","Telephone No":{" 1":"175444455"}}
        ,
        {"Healthcare Provider Name":"Al Fajr Polyclinic","District":"Northen Province","Address 1":"Abu Bakr Al Sadeeq Street,","Branch":"P.O. Box 2005","Address 3":"","City":"Madina","Telephone No":{" 1":"148467890"}}
        ,
        {"Healthcare Provider Name":"Al Falah International Hospital","District":"Central Province","Address 1":"Ammar Bin Yaser St.","Branch":"Ghubaira","Address 3":"PO Box 43005","City":"Riyadh","Telephone No":{" 1":"114463737"}}
        ,
        {"Healthcare Provider Name":"Al Farabi Dental Center - Dhahrat Al Badiah","District":"Central Province","Address 1":"Dhahrat Al Badiah Dist,","Branch":"Al Madinah Al Munawara street.","Address 3":"PO BOX 34985","City":"Riyadh","Telephone No":{" 1":"112628943"}}
        ,
        {"Healthcare Provider Name":"Al Farabi International Polyclinic","District":"Western Province","Address 1":"Royal Commission Dist. King Fahad St.","Branch":"King Fahad St.","Address 3":"P.O.Box 32060","City":"Yanbu","Telephone No":{" 1":"143927292"}}
        ,
        {"Healthcare Provider Name":"Al Farabi Optical Center","District":"Central Province","Address 1":"Prince Mousaed Bin Abdul Rahman Street","Branch":"P O Box 34985 Riyadh - 11478","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Farabi Top Dental Clinics","District":"Central Province","Address 1":"Al Mansura Dist","Branch":"Al Kharj Road","Address 3":"PO BOX 30882","City":"Riyadh","Telephone No":{" 1":"114278555"}}
        ,
        {"Healthcare Provider Name":"Al Farabi Top Dental Clinics - Al Aqeeq","District":"Central Province","Address 1":"Al Aqeeq Dist,","Branch":"King Fahad St.","Address 3":"PO BOX 34985","City":"Riyadh","Telephone No":{" 1":"114852295"}}
        ,
        {"Healthcare Provider Name":"Al Faraby Dispensary - 1st Industrial City","District":"Eastern Province","Address 1":"Industrial City","Branch":"PO Box 1323","Address 3":"31473","City":"Dammam","Telephone No":{" 1":"138474080"}}
        ,
        {"Healthcare Provider Name":"Al Faraby Dispensary - Dammam","District":"Eastern Province","Address 1":"42 Street Cross with King Fahad Street","Branch":"PO Box 12420","Address 3":"31473","City":"Dammam","Telephone No":{" 1":"138420909"}}
        ,
        {"Healthcare Provider Name":"Al Faraby Medical Center - Al Khobar","District":"Eastern Province","Address 1":"Anas Bin Malik Street, Dhahran","Branch":"PO Box 2685","Address 3":"31952","City":"Dahran","Telephone No":{" 1":"138916163"}}
        ,
        {"Healthcare Provider Name":"Al Fares Crystal Medical Complex - Al Sharaea'a","District":"Western Province","Address 1":"Al Sharaea'a Dist. block 2","Branch":"In front of Al Sharaea'a police station","Address 3":"","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Fares Crystal Medical Complex - Al Sharaea'a","District":"Western Province","Address 1":"Al Sharaea'a Dist. block 2","Branch":"In front of Al Sharaea'a police station","Address 3":"","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Fares Medical Clinic","District":"Central Province","Address 1":"Bilal Bin Rabah Street","Branch":"Al Shefaa Dis","Address 3":"P.O Box 16387","City":"Riyadh","Telephone No":{" 1":"112624678"}}
        ,
        {"Healthcare Provider Name":"Al Faysal Polyclinic - 3","District":"Western Province","Address 1":"P O Box - 17377","Branch":"Jeddah - 21484","Address 3":"","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Faysal Polyclinic 2","District":"Western Province","Address 1":"Al-Naem Dist, Thalateen St.","Branch":"P.O. Box 17377","Address 3":"21484","City":"Jeddah","Telephone No":{" 1":"126120999"}}
        ,
        {"Healthcare Provider Name":"Al Fereh Hospital","District":"Central Province","Address 1":"Al-Khubeb Street","Branch":"P.O. Box 1403","Address 3":"","City":"Bureidah","Telephone No":{" 1":"163245501"}}
        ,
        {"Healthcare Provider Name":"Al Flaiw Polyclinic","District":"Central Province","Address 1":"Al Ofuq Dist","Branch":"King Saud Road","Address 3":"PO BOX 30855","City":"Bureidah","Telephone No":{" 1":"163856611"}}
        ,
        {"Healthcare Provider Name":"Al Flaiw Polyclinic - Riad Al Kabrah","District":"Central Province","Address 1":"Al Tawoon Dist","Branch":"King Abdullah Road","Address 3":"PO BOX 30855","City":"Qassim","Telephone No":{" 1":"163342901"}}
        ,
        {"Healthcare Provider Name":"Al Gannas Medical Group","District":"Central Province","Address 1":"PO Box 65","Branch":"11942","Address 3":"","City":"Al Kharj","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Genah Medical Center - Al Rass","District":"Central Province","Address 1":"Al Nakheel Dist","Branch":"Al Shananah","Address 3":"PO BOX 1890","City":"Al Russ","Telephone No":{" 1":"163335500"}}
        ,
        {"Healthcare Provider Name":"Al Habib Medical Clinic - Majmaah","District":"Central Province","Address 1":"King Salman Street","Branch":"P.O. Box 487","Address 3":"","City":"Al Majmaa","Telephone No":{" 1":"164323931"}}
        ,
        {"Healthcare Provider Name":"Al Hadi Clinic","District":"Eastern Province","Address 1":"Snabees Dist,","Branch":"Al Corneish St.","Address 3":"PO BOX 13785","City":"Qatif","Telephone No":{" 1":"138230333"}}
        ,
        {"Healthcare Provider Name":"Al Haih Medical Center","District":"Southren Province","Address 1":"King Abdulaziz Road","Branch":"Infront of King Khaled Hospital","Address 3":"","City":"Najran","Telephone No":{" 1":"175290888"}}
        ,
        {"Healthcare Provider Name":"Al Hakamy Clinic","District":"Southren Province","Address 1":"Al Janoubi Dist,","Branch":"Main St","Address 3":"Box,1144","City":"Abu Arish","Telephone No":{" 1":"173243333"}}
        ,
        {"Healthcare Provider Name":"Al Hakamy Medical Complex","District":"Southren Province","Address 1":"Ahad Al Masarha","Branch":"Al Wasat District","Address 3":"Main Street","City":"Ahad Al Masarha","Telephone No":{" 1":"173193203"}}
        ,
        {"Healthcare Provider Name":"Al Hakim Dental Center","District":"Central Province","Address 1":"Tweeq Dist","Branch":"Bilal Bin Rabah St.","Address 3":"PO BOX 34985","City":"Riyadh","Telephone No":{" 1":"112475516"}}
        ,
        {"Healthcare Provider Name":"Al Hakim Polyclinic","District":"Central Province","Address 1":"Al Oraijaa Dist","Branch":"Prince Musaeed Bin Abdulrahman St","Address 3":"PO BOX 34985","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Hamad Medical Clinic (Sakaka)","District":"Northen Province","Address 1":"Al Jouf- Sakaka","Branch":"P.O. Box 305","Address 3":"","City":"Sakaka","Telephone No":{" 1":"146246667"}}
        ,
        {"Healthcare Provider Name":"Al Hammadi Al Suweidi Hospital","District":"Central Province","Address 1":"Al Suweidi Dist.","Branch":"King Fahd Road","Address 3":"P.O.Box. 55004","City":"Riyadh","Telephone No":{" 1":"114250000"}}
        ,
        {"Healthcare Provider Name":"Al Hammadi Hospital","District":"Central Province","Address 1":"Al Aqarieh Street","Branch":"P.O. Box 55004","Address 3":"11534","City":"Riyadh","Telephone No":{" 1":"114622000"}}
        ,
        {"Healthcare Provider Name":"Al Hammadi Hospital - Al Nozha","District":"Central Province","Address 1":"Al Nuzha Dist","Branch":"Al Ameer Meqren Street","Address 3":"P.o Box 55004","City":"Riyadh","Telephone No":{" 1":"114837777"}}
        ,
        {"Healthcare Provider Name":"Al Hamra Hospital","District":"Western Province","Address 1":"Al Hamra District","Branch":"P.O. Box 2078","Address 3":"21451","City":"Jeddah","Telephone No":{" 1":"126653939"}}
        ,
        {"Healthcare Provider Name":"Al Hanakiah Clinic","District":"Northen Province","Address 1":"Al Mafraq Dist","Branch":"Main Street","Address 3":"Al Hanakiah Area","City":"Madina","Telephone No":{" 1":"148620893"}}
        ,
        {"Healthcare Provider Name":"Al Hanan Al Mutamaiz Medical Center","District":"Western Province","Address 1":"Al Safa Dist","Branch":"Prince Meiteb Road","Address 3":"11001","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Hanan Polyclinic","District":"Western Province","Address 1":"Al Wazeeriya Dist.","Branch":"Stadium Road","Address 3":"P.O.Box 42364","City":"Jeddah","Telephone No":{" 1":"126111349"}}
        ,
        {"Healthcare Provider Name":"Al Haramain Medical Complex","District":"Central Province","Address 1":"Al Rawdah Dist,Hatem Al Taey St.","Branch":"P.O. Box 88322","Address 3":"","City":"Riyadh","Telephone No":{" 1":"112323666"}}
        ,
        {"Healthcare Provider Name":"Al Haramain Medical Polyclinic Group - Khamis Mushayt","District":"Southren Province","Address 1":"Al Azizyah Dist","Branch":"King Fahad Street","Address 3":"PO BOX 6108","City":"Khamis Mushyat","Telephone No":{" 1":"172220277"}}
        ,
        {"Healthcare Provider Name":"Al Haramain Polyclinic - Ahad Rufaidah","District":"Southren Province","Address 1":"Ahad Rufaidah","Branch":"Military city gate 3","Address 3":"PO Box 378","City":"Ahad Rufaidah","Telephone No":{" 1":"172507271"}}
        ,
        {"Healthcare Provider Name":"Al Haramain Polyclinic - Jizan","District":"Southren Province","Address 1":"Prince Sultan St, Al Rawdah District","Branch":"Military city gate 3","Address 3":"PO BOX 378","City":"Gizan","Telephone No":{" 1":"173172222"}}
        ,
        {"Healthcare Provider Name":"Al Hashbool Polyclinic","District":"Western Province","Address 1":"Al Baha Aqeq Balqaa , General RD .","Branch":"P.O.Box 1 Al Baha 1081","Address 3":"","City":"Al Baha","Telephone No":{" 1":"177290145"}}
        ,
        {"Healthcare Provider Name":"Al Hassan Hospital","District":"Western Province","Address 1":"Al Haweyah","Branch":"Riyadh general road","Address 3":"P.O.Box. 8245","City":"Taif","Telephone No":{" 1":"920009551"}}
        ,
        {"Healthcare Provider Name":"Al Hassan Hospital","District":"Western Province","Address 1":"Al Haweyah","Branch":"Riyadh general road","Address 3":"P.O.Box. 8245","City":"Taif","Telephone No":{" 1":"920009551"}}
        ,
        {"Healthcare Provider Name":"Al Hayah National Hospital - Jazan","District":"Southren Province","Address 1":"Al Kornish Al Shamily","Branch":"Al Shamal","Address 3":"PO BOX 2691","City":"Gizan","Telephone No":{" 1":"173311111"}}
        ,
        {"Healthcare Provider Name":"Al Hayah National Hospital - Khamis Mushyat","District":"Southren Province","Address 1":"Om Sarar Dist.","Branch":"Riyadh Road","Address 3":"PO Box 3876","City":"Khamis Mushyat","Telephone No":{" 1":"172334444"}}
        ,
        {"Healthcare Provider Name":"Al Hayat Hospital","District":"Western Province","Address 1":"Television St","Branch":"P.O. Box 5473","Address 3":"21422","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Hayat Medical Center","District":"Southren Province","Address 1":"King Fahad Dist.","Branch":"Prince Sultan Bin Abdul Aziz St.","Address 3":"","City":"Abu Arish","Telephone No":{" 1":"173254100"}}
        ,
        {"Healthcare Provider Name":"Al Hayat Medical Polyclinic Complex","District":"Western Province","Address 1":"Al Otaibiah Dist","Branch":"Main Street","Address 3":"PO BOX 8234","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Hayat Medical Polyclinic Complex","District":"Western Province","Address 1":"Al Otaibiah Dist","Branch":"Main Street","Address 3":"PO BOX 8234","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Hayat National Hospital","District":"Central Province","Address 1":"Al Rabaw Region exit 14, East Circle way","Branch":"P.O. Box 41116","Address 3":"11521","City":"Riyadh","Telephone No":{" 1":"114455555"}}
        ,
        {"Healthcare Provider Name":"Al Hayat National Polyclinic","District":"Central Province","Address 1":"Exit 15 East Side, Haroon Al Rasheed","Branch":"Al Rawdah","Address 3":"PO Box 28699","City":"Riyadh","Telephone No":{" 1":"112441692"}}
        ,
        {"Healthcare Provider Name":"Al Hayat National Polyclinic - Airport","District":"Central Province","Address 1":"King Khalid International Airport","Branch":"Riyadh - 13471","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Hayat National Polyclinic 1","District":"Central Province","Address 1":"Eshbeliyah District","Branch":"Al Hassan Bin Al Hussain Street","Address 3":"PO Box 28699 Riyadh 11447","City":"Riyadh","Telephone No":{" 1":"112789333"}}
        ,
        {"Healthcare Provider Name":"Al Hayat National Polyclinic 2","District":"Central Province","Address 1":"Nafal District","Branch":"PO Box 55237","Address 3":"11534","City":"Riyadh","Telephone No":{" 1":"112741356"}}
        ,
        {"Healthcare Provider Name":"Al Hayat Polyclinic 2","District":"Central Province","Address 1":"All Nazeem Dist.","Branch":"Al Marmar st.","Address 3":"P.O.Box 28699","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Hiba Polyclinic","District":"Western Province","Address 1":"Ruwais","Branch":"Hail Street","Address 3":"","City":"Jeddah","Telephone No":{" 1":"126500089"}}
        ,
        {"Healthcare Provider Name":"Al Higrah Medical Center","District":"Western Province","Address 1":"Kilo 11 - Makkah Old Road","Branch":"P.O.Box 3785","Address 3":"Jeddah 21481","City":"Jeddah","Telephone No":{" 1":"126216040"}}
        ,
        {"Healthcare Provider Name":"Al Hilal Pharmacy","District":"Eastern Province","Address 1":"North Khobar","Branch":"King Abdullah St,","Address 3":"Box 398","City":"Khobar","Telephone No":{" 1":"138641551"}}
        ,
        {"Healthcare Provider Name":"Al Hujeilan Medical Center","District":"Eastern Province","Address 1":"Al Azizyah Dist","Branch":"Behind NCB","Address 3":"Box 227","City":"Hafr Al Batin","Telephone No":{" 1":"137225266"}}
        ,
        {"Healthcare Provider Name":"Al Husam Polyclinic - Khamis Mushyat","District":"Southren Province","Address 1":"Khamis Mushyat","Branch":"Military city gate 3","Address 3":"PO BOX 378","City":"Khamis Mushyat","Telephone No":{" 1":"172351154"}}
        ,
        {"Healthcare Provider Name":"Al Jafel International Hospital","District":"Central Province","Address 1":"Al Bade'aa District","Branch":"Bilal Ben Rabah Street","Address 3":"PO Box: 5255","City":"Riyadh","Telephone No":{" 1":"114322222"}}
        ,
        {"Healthcare Provider Name":"Al Jazeera Hospital","District":"Central Province","Address 1":"Hassan Bin Thabet Street","Branch":"Al Naseem Dist.","Address 3":"P.O. BOX: 92013","City":"Riyadh","Telephone No":{" 1":"920005322"}}
        ,
        {"Healthcare Provider Name":"Al Jazerah Polyclinic - Sharoorah","District":"Southren Province","Address 1":"Al Emarah St.","Branch":"P.O. Box 30","Address 3":"","City":"Sharoorah","Telephone No":{" 1":"175321966"}}
        ,
        {"Healthcare Provider Name":"Al Jazira Polyclinic (Tabuk)","District":"Northen Province","Address 1":"PO Box 55","Branch":"","Address 3":"","City":"Tabuk","Telephone No":{" 1":"144237009"}}
        ,
        {"Healthcare Provider Name":"Al Jedaani Hospital - Al Safa","District":"Western Province","Address 1":"Prince Muteeb St ( Al Arbaeen )","Branch":"Al Safa Dist","Address 3":"PO BOX 7500","City":"Jeddah","Telephone No":{" 1":"126772221"}}
        ,
        {"Healthcare Provider Name":"Al Kadesiah Polyclinic","District":"Central Province","Address 1":"Al Khaldiyah District","Branch":"Al Asmae Street","Address 3":"PO Box 3704","City":"Riyadh","Telephone No":{" 1":"114460800"}}
        ,
        {"Healthcare Provider Name":"Al Kamal Medical Clinic","District":"Central Province","Address 1":"King Salman Bin Abdul Aziz Street","Branch":"Al Toubad Dist.","Address 3":"","City":"Al Aflaj","Telephone No":{" 1":"116821111"}}
        ,
        {"Healthcare Provider Name":"Al Khaledia Medical Complex","District":"Central Province","Address 1":"Al Khaldia","Branch":"P.O. Box 5007","Address 3":"1422","City":"Riyadh","Telephone No":{" 1":"114481448"}}
        ,
        {"Healthcare Provider Name":"Al Khaleej Medical Complex","District":"Central Province","Address 1":"Al Khaleej Dist","Branch":"Prince Bandar Bin Abdulaziz St.","Address 3":"PO BOX 375499","City":"Riyadh","Telephone No":{" 1":"920002314"}}
        ,
        {"Healthcare Provider Name":"Al Khaleej Polyclinic - Hail","District":"Central Province","Address 1":"Prince Sultan Bin Abdul Aziz Street,","Branch":"P.O Box 92","Address 3":"Hail","City":"Hail","Telephone No":{" 1":"165322333"}}
        ,
        {"Healthcare Provider Name":"Al Khaleejy Dental Center - Shubra","District":"Central Province","Address 1":"Shubra Dist.","Branch":"Mohammed Bin Abdullatif St.","Address 3":"P.O.Box 31067","City":"Riyadh","Telephone No":{" 1":"920002462"}}
        ,
        {"Healthcare Provider Name":"Al Khaleejy Medical Clinic - 2nd Industrial","District":"Central Province","Address 1":"Al Manakh Dist","Branch":"Industrial Area 2","Address 3":"PO BOX 31067","City":"Riyadh","Telephone No":{" 1":"114987039"}}
        ,
        {"Healthcare Provider Name":"Al Khaleejy Medical Clinic - Al Shefa","District":"Central Province","Address 1":"Al Shefa District","Branch":"Al Muthna Bin Hartha St","Address 3":"PO Box 31067","City":"Riyadh","Telephone No":{" 1":"920002462"}}
        ,
        {"Healthcare Provider Name":"Al Khaleejy Medical Clinic - Shoubra","District":"Central Province","Address 1":".","Branch":"","Address 3":"","City":"Riyadh","Telephone No":{" 1":"14260861"}}
        ,
        {"Healthcare Provider Name":"Al Khalidia Medical Center","District":"Southren Province","Address 1":"Al khaldiah District Thalatheen St","Branch":"PO Box 50840 Khamis Mushyat","Address 3":"","City":"Khamis Mushyat","Telephone No":{" 1":"172214301"}}
        ,
        {"Healthcare Provider Name":"Al Khalil Medical Clinics","District":"Western Province","Address 1":"Al Jefiyjef District","Branch":"King Khalied Road","Address 3":"","City":"Taif","Telephone No":{" 1":"127325522"}}
        ,
        {"Healthcare Provider Name":"AL Khamaseen Medical Clinic","District":"Central Province","Address 1":"Al Khamaseen Medical Clinic","Branch":"Al Am street, Al Khamesyen District","Address 3":"Wadi Al Dawaser","City":"Wadi Al Dawasr","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Khazan Medical Clinics 2","District":"Central Province","Address 1":"Al Marwa Dist","Branch":"Dirab Road Al Maared St.","Address 3":"PO BOX 35971","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Khazan Medical Polyclinic","District":"Central Province","Address 1":"Khazan Street","Branch":"P.O. Box 35971","Address 3":"11498","City":"Riyadh","Telephone No":{" 1":"114355252"}}
        ,
        {"Healthcare Provider Name":"Al Khazan Modern Dental Center","District":"Central Province","Address 1":"Al Washm Dist,","Branch":"Amro Bin Al A'as St.","Address 3":"PO BOX 17279","City":"Riyadh","Telephone No":{" 1":"114040446"}}
        ,
        {"Healthcare Provider Name":"Al Khobar Cooperative Clinic","District":"Eastern Province","Address 1":"PO Box 2646","Branch":"Al Akrabiyah District","Address 3":"22nd street","City":"Khobar","Telephone No":{" 1":"138640141"}}
        ,
        {"Healthcare Provider Name":"Al Kholood Polyclinic","District":"Western Province","Address 1":"Al Zaher District, Al Hajj Street,","Branch":"P.O. Box 5982","Address 3":"","City":"Makkah","Telephone No":{" 1":"125459407"}}
        ,
        {"Healthcare Provider Name":"Al Layth Integrated Medical Complex","District":"Western Province","Address 1":"Old Lieth","Branch":"King Faisal St .","Address 3":"P.O.Box . 122975","City":"Jeddah","Telephone No":{" 1":"177423447"}}
        ,
        {"Healthcare Provider Name":"Al Lulu Medical Complex","District":"Eastern Province","Address 1":"Jubail Industrial City","Branch":"PO Box 11445","Address 3":"","City":"Jubail","Telephone No":{" 1":"133485555"}}
        ,
        {"Healthcare Provider Name":"Al Maali Hospital","District":"Eastern Province","Address 1":"Qutaiba Bin Muslim St.","Branch":"Al Baladia Dist.","Address 3":"P.O.Box. 1020","City":"Hafr Al Batin","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Maali Medical Company - Bureidah","District":"Central Province","Address 1":"Al Qassim","Branch":"PO Box 2274","Address 3":"","City":"Bureidah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Maali Medical Company - Onaizah","District":"Central Province","Address 1":"Al Fakhreya District","Branch":"","Address 3":"","City":"Onaizah","Telephone No":{" 1":"163633339"}}
        ,
        {"Healthcare Provider Name":"Al Madar Dental Clinic - Al Madinah","District":"Northen Province","Address 1":"Abu Baker Al Sedeeq Dist","Branch":"Abu Baker Al Sedeeq St, Sandy Center","Address 3":"PO BOX 41901","City":"Madina","Telephone No":{" 1":"148467333"}}
        ,
        {"Healthcare Provider Name":"Al Madar Dental Clinic (5)","District":"Central Province","Address 1":"Al Badr District","Branch":"Al Khalil Ibn Ahmad Street","Address 3":"PO Box 54223 Riyadh 11514","City":"Riyadh","Telephone No":{" 1":"14546403"}}
        ,
        {"Healthcare Provider Name":"Al Madar Diamond Co.","District":"Eastern Province","Address 1":"Al Sharwfiah Dist","Branch":"Al Thahran Street","Address 3":"PO BOX 11514","City":"Al Hasa","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Madar Medical Clinics Complex for Dental","District":"Central Province","Address 1":"Al Daa're Road","Branch":"Al Rawda Dis","Address 3":"PO Box 11514 Riyadh 54223","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Madina Hearing Aids Center","District":"Central Province","Address 1":"Olaya Dist","Branch":"Khrees Road","Address 3":"PO BOX 6812","City":"Riyadh","Telephone No":{" 1":"114788809"}}
        ,
        {"Healthcare Provider Name":"Al Madina Medical Clinic","District":"Western Province","Address 1":"Al Jameah Dist,","Branch":"Al Seerah Al Atirah Dist.","Address 3":"PO BOX 52128","City":"Jeddah","Telephone No":{" 1":"126881288"}}
        ,
        {"Healthcare Provider Name":"Al Madina Optical Group","District":"Central Province","Address 1":"Malaz Dist, Salah Al Deen St","Branch":"Box,6812","Address 3":"Riyadh 11452","City":"Riyadh","Telephone No":{" 1":"112916090"}}
        ,
        {"Healthcare Provider Name":"Al Madlouh Dispensary","District":"Eastern Province","Address 1":"Al Ferdous Dis, PO Box 662","Branch":"31972","Address 3":"","City":"Sayhat","Telephone No":{" 1":"138500208"}}
        ,
        {"Healthcare Provider Name":"Al Maghlouth Medical Polyclinics","District":"Eastern Province","Address 1":"Mubarraz District","Branch":"Makka St.","Address 3":"PO Box 10375","City":"Al Hasa","Telephone No":{" 1":"135311155"}}
        ,
        {"Healthcare Provider Name":"Al Maha Opticals","District":"Central Province","Address 1":"Al Rawda District","Branch":"Al Hasan Bin Ali Streer","Address 3":"PO Box 10524 Riyadh 11646","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Majd Medical Complex","District":"Western Province","Address 1":"Al Faihaa District","Branch":"Khaled Bin Alwleed Street","Address 3":"PO Box 8881 Jeddah 21492","City":"Jeddah","Telephone No":{" 1":"126308000"}}
        ,
        {"Healthcare Provider Name":"Al Mana General Hospital - Al Jubail","District":"Eastern Province","Address 1":"Jubail Industrial Area, Al Hawilat Dis,","Branch":"P.O. Box 10366","Address 3":"31961","City":"Jubail","Telephone No":{" 1":"133412000"}}
        ,
        {"Healthcare Provider Name":"Al Mana General Hospital - Dammam","District":"Eastern Province","Address 1":"Abdulla Fouad Dis, Emam Ali St,","Branch":"P.O. Box 2366","Address 3":"31451","City":"Dammam","Telephone No":{" 1":"138985382"}}
        ,
        {"Healthcare Provider Name":"Al Mana General Hospital - Hofuf","District":"Eastern Province","Address 1":"P.O. Box 50367","Branch":"P.O. Box 50367","Address 3":"31982","City":"Al Hasa","Telephone No":{" 1":"135887000"}}
        ,
        {"Healthcare Provider Name":"Al Mana General Hospital (Al Khobar)","District":"Eastern Province","Address 1":"Prince Talal Street","Branch":"P.O. Box 311","Address 3":"31952","City":"Khobar","Telephone No":{" 1":"138987000"}}
        ,
        {"Healthcare Provider Name":"Al Mana Medical Center - Al Rakah","District":"Eastern Province","Address 1":"Al Raka, Tariq Bin Ziyad Road,","Branch":"","Address 3":"","City":"Khobar","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Mana Medical Center - Jubail","District":"Eastern Province","Address 1":"Al Dafi Dist, Mahalat Al Faiha","Branch":"Jubail Al Sinaeyah","Address 3":"Box 10366","City":"Jubail","Telephone No":{" 1":"133412000"}}
        ,
        {"Healthcare Provider Name":"Al Mana Medical Dispensary","District":"Eastern Province","Address 1":"2nd Industrial City","Branch":"Abqaike Road","Address 3":"","City":"Dammam","Telephone No":{" 1":"138122154"}}
        ,
        {"Healthcare Provider Name":"Al Manar Medical Complex","District":"Eastern Province","Address 1":"Al Rabwah Dist","Branch":"Prince Sultan","Address 3":"P.O BOX 889","City":"Hafr Al Batin","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Mansur Medical Complex","District":"Central Province","Address 1":"Al Saadah Dist,","Branch":"Al Selli","Address 3":"PO BOX 92634","City":"Riyadh","Telephone No":{" 1":"12413475"}}
        ,
        {"Healthcare Provider Name":"Al Mas Dental Clinic","District":"Eastern Province","Address 1":"Al Faisaliah District","Branch":"Omar Bin Al Khattab St","Address 3":"PO Box 148 Dammam 81888","City":"Dammam","Telephone No":{" 1":"138117979"}}
        ,
        {"Healthcare Provider Name":"Al Mas Ideal Medical","District":"Western Province","Address 1":"Al Rabwah District","Branch":"Makarona Street (80)","Address 3":"P.O.Box. 23580","City":"Jeddah","Telephone No":{" 1":"126596600"}}
        ,
        {"Healthcare Provider Name":"Al Mas Ideal Medical","District":"Western Province","Address 1":"Al Rabwah District","Branch":"Makarona Street (80)","Address 3":"P.O.Box. 23580","City":"Jeddah","Telephone No":{" 1":"126596600"}}
        ,
        {"Healthcare Provider Name":"Al Maseef Polyclinic Complex","District":"Central Province","Address 1":"Al Masyaf","Branch":"Bin Senaa Street","Address 3":"PO Box 12393 Riyadh 11751","City":"Riyadh","Telephone No":{" 1":"112255000"}}
        ,
        {"Healthcare Provider Name":"Al Mashfa Medical Center","District":"Central Province","Address 1":"PO Box 10526","Branch":"11646","Address 3":"","City":"Riyadh","Telephone No":{" 1":"112088585"}}
        ,
        {"Healthcare Provider Name":"Al Mawed Medical Center","District":"Central Province","Address 1":"Al Worood Dist.,in front of Fal","Branch":"Abdul Aziz Abalkheil Buildings","Address 3":"P.O.Box. 87622","City":"Riyadh","Telephone No":{" 1":"114531714"}}
        ,
        {"Healthcare Provider Name":"Al Mawj Polyclinics","District":"Western Province","Address 1":"Al Nahda District","Branch":"Hera Street","Address 3":"PO Box 126696 Jeddah 21352","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Methnab Afyaa Medical Complex","District":"Central Province","Address 1":"Al Methnab","Branch":"Al Khaldiyah District","Address 3":"","City":"Qassim","Telephone No":{" 1":"163422117"}}
        ,
        {"Healthcare Provider Name":"Al Miawiyah Consultative Clinic 6","District":"Central Province","Address 1":"Al Maazar District","Branch":"Prince Abdulaziz Bin Mesayid Street","Address 3":"PO Box 17114 Riyadh 11484","City":"Riyadh","Telephone No":{" 1":"112314444"}}
        ,
        {"Healthcare Provider Name":"Al Miawiyah Consultative Clinic Al Naseem (1)","District":"Central Province","Address 1":"Al Naseem District","Branch":"Ahmad Ibn Hanbal Street","Address 3":"PO Box 120499 Riyadh 11679","City":"Riyadh","Telephone No":{" 1":"112314444"}}
        ,
        {"Healthcare Provider Name":"Al Mobarak Hospital","District":"Central Province","Address 1":"Al- Morabaa Area, King Faisl Road","Branch":"P.O. Box 15563","Address 3":"11454","City":"Riyadh","Telephone No":{" 1":"114015282"}}
        ,
        {"Healthcare Provider Name":"Al Mohammadiah Medical Center","District":"Central Province","Address 1":"Riyadh Takhassusi St","Branch":"Al Mohammadiah Area","Address 3":"52218","City":"Riyadh","Telephone No":{" 1":"112101313"}}
        ,
        {"Healthcare Provider Name":"Al Moheimeed National Clinic","District":"Central Province","Address 1":"Al Khobaib Dist.","Branch":"Al Wehda St.","Address 3":"P.O.Box 2821","City":"Bureidah","Telephone No":{" 1":"163244905"}}
        ,
        {"Healthcare Provider Name":"Al Mokhles Hearing Center","District":"Western Province","Address 1":"Mosharefa District","Branch":"Flasteen Street","Address 3":"PO Box 54936 Jeddah 21524","City":"Jeddah","Telephone No":{" 1":"126682255"}}
        ,
        {"Healthcare Provider Name":"Al Mokhtar Polyclinic (Taif)","District":"Western Province","Address 1":"Al Haweya","Branch":"King Fahad Sports City","Address 3":"PO Box 546","City":"Taif","Telephone No":{" 1":"127252702"}}
        ,
        {"Healthcare Provider Name":"Al Momtaz Medical Complex","District":"Central Province","Address 1":"Al Mlaz District","Branch":"Jareer Street","Address 3":"PO Box 28060 Riyadh 11437","City":"Riyadh","Telephone No":{" 1":"112920091"}}
        ,
        {"Healthcare Provider Name":"Al Moosa Hospital","District":"Eastern Province","Address 1":"Al-Ahsa -Dahran St","Branch":"P.O. Box 5098","Address 3":"31982","City":"Al Hasa","Telephone No":{" 1":"135369666"}}
        ,
        {"Healthcare Provider Name":"Al Moraya Experts Medical Complex Sabia","District":"Southren Province","Address 1":"Al Sharq Dist","Branch":"Sabya-Kolayat Al Tarebeyya Road","Address 3":"P.O BOX 30","City":"Sabya","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Mostaqbal Hospital","District":"Western Province","Address 1":"Bakhashab St.","Branch":"P.O. Box 1878","Address 3":"21441","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Mouwasat Hospital - Al Jubail","District":"Eastern Province","Address 1":"Al Andalus St, cross with 14St.","Branch":"P.O. Box 10028","Address 3":"31961","City":"Jubail","Telephone No":{" 1":"133490000"}}
        ,
        {"Healthcare Provider Name":"Al Mouwasat Hospital - Al Khobar","District":"Eastern Province","Address 1":"PO Box - 7011, 31462","Branch":"","Address 3":"","City":"Khobar","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Mouwasat Hospital - Dammam","District":"Eastern Province","Address 1":"Plan 71,","Branch":"P.O. Box 282","Address 3":"31411","City":"Dammam","Telephone No":{" 1":"138200000"}}
        ,
        {"Healthcare Provider Name":"Al Mouwasat Hospital - Qatif","District":"Eastern Province","Address 1":"Old Airport Road","Branch":"P.O. Box 1444","Address 3":"31911","City":"Qatif","Telephone No":{" 1":"138512222"}}
        ,
        {"Healthcare Provider Name":"Al Mowadah Clinic - Wadi Al Dawaser","District":"Central Province","Address 1":"Al Lidam Dist,","Branch":"Main St.","Address 3":"PO BOX 515","City":"Wadi Al Dawasr","Telephone No":{" 1":"117844559"}}
        ,
        {"Healthcare Provider Name":"Al Muhanna Pharmacy","District":"Eastern Province","Address 1":"Al Quds Street, Majedyaa District","Branch":"Next to Dr Al Beriki Polyclinic","Address 3":"PO Box 255","City":"Qatif","Telephone No":{" 1":"138546216"}}
        ,
        {"Healthcare Provider Name":"Al Mulhim Polyclinic","District":"Eastern Province","Address 1":"Al Mazro'a Dist.","Branch":"Qatar Road","Address 3":"P.O.Box 5221","City":"Al Hasa","Telephone No":{" 1":"135805030"}}
        ,
        {"Healthcare Provider Name":"Al Mursalaat Polyclinic","District":"Central Province","Address 1":"Al Nozha Dis Abu Baker Siddiq Street","Branch":"Abu Baker Siddiq Street","Address 3":"PO Box 88103 Riyadh 11662","City":"Riyadh","Telephone No":{" 1":"114541337"}}
        ,
        {"Healthcare Provider Name":"Al Mursalaat Polyclinic","District":"Central Province","Address 1":"Al Nozha Dis Abu Baker Siddiq Street","Branch":"Abu Baker Siddiq Street","Address 3":"PO Box 88103 Riyadh 11662","City":"Riyadh","Telephone No":{" 1":"114541337"}}
        ,
        {"Healthcare Provider Name":"Al Naba Complex for Medical Services","District":"Eastern Province","Address 1":"Al Fanateer Dist","Branch":"Al Lulu St","Address 3":"Box 369058 Jubail 31961","City":"Jubail","Telephone No":{" 1":"133451111"}}
        ,
        {"Healthcare Provider Name":"Al Nahda Hospital","District":"Western Province","Address 1":"Al Hawia Street","Branch":"PO Box 35","Address 3":"","City":"Taif","Telephone No":{" 1":"127250600"}}
        ,
        {"Healthcare Provider Name":"Al Nahda Polyclinic Company","District":"Central Province","Address 1":"Al Ezdhar Dist,","Branch":"Imam Soud Bin Abdul Aziz St,","Address 3":"PO BOX 123939","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Naim Polyclinic","District":"Eastern Province","Address 1":"Al Essaila District","Branch":"Omar Bin Al Khatab Street","Address 3":"PO Box 11313 Al Ahsa 31982","City":"Al Hasa","Telephone No":{" 1":"135879312"}}
        ,
        {"Healthcare Provider Name":"Al Nakeel Dental Center 1","District":"Central Province","Address 1":"Al Swaidi Dist,","Branch":"Al Nakheel Street","Address 3":"PO BOX 34985","City":"Riyadh","Telephone No":{" 1":"114181178"}}
        ,
        {"Healthcare Provider Name":"Al Nakheel National Clinic - Rabigh","District":"Western Province","Address 1":"Main Street, Rabigh","Branch":"PO Box 270","Address 3":"21911","City":"Rabigh","Telephone No":{" 1":"124221200"}}
        ,
        {"Healthcare Provider Name":"Al Nazeem National Polyclinic","District":"Central Province","Address 1":"Al Nazeem Dist","Branch":"Riafa'ah Bin Aous St.","Address 3":"P.O.Box 3545","City":"Riyadh","Telephone No":{" 1":"112463331"}}
        ,
        {"Healthcare Provider Name":"Al Nomais Medical Complex - Abha - Al Badea","District":"Southren Province","Address 1":"Al Badea Dist.","Branch":"Abha Khamis Road","Address 3":"P.O.Box 25380","City":"Abha","Telephone No":{" 1":"172253555"}}
        ,
        {"Healthcare Provider Name":"Al Nomais Medical Complex - Khamis Mushait- Bin Hasball Valley","District":"Southren Province","Address 1":"General Road","Branch":"Bin Hasball Valley","Address 3":"POBox 1018","City":"Khamis Mushyat","Telephone No":{" 1":"172822676"}}
        ,
        {"Healthcare Provider Name":"Al Nomais Medical Complex - Khamis Mushayt","District":"Southren Province","Address 1":"Shebaah Dist.","Branch":"Al Thamanin St.","Address 3":"P.O.Box 25380","City":"Khamis Mushyat","Telephone No":{" 1":"172231999"}}
        ,
        {"Healthcare Provider Name":"Al Nomais Polyclinic Complex","District":"Southren Province","Address 1":"Abha - Khamis road -","Branch":"P.O. Box 1018","Address 3":"Asir - Abha","City":"Abha","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Noor Polyclinic - Hail","District":"Central Province","Address 1":"King Abdul Aziz Street","Branch":"PO BOX 7225","Address 3":"Hail","City":"Hail","Telephone No":{" 1":"165344440"}}
        ,
        {"Healthcare Provider Name":"Al Nour Polyclinic","District":"Northen Province","Address 1":"Zubir Bin Al Awam Street","Branch":"Badr Al Shohadaa District","Address 3":"P O Box 3","City":"Madina","Telephone No":{" 1":"143320227"}}
        ,
        {"Healthcare Provider Name":"Al Nowaimah National Polyclinic","District":"Central Province","Address 1":"Wadi Al Dawaser","Branch":"P.O. Box 9138","Address 3":"","City":"Al Nowaiemah","Telephone No":{" 1":"17861495"}}
        ,
        {"Healthcare Provider Name":"Al Nowras Dental Speciality Clinics","District":"Western Province","Address 1":"Al Rawdah District","Branch":"Sari Street","Address 3":"P.O Box 40074 Jeddah 21499","City":"Jeddah","Telephone No":{" 1":"126068182"}}
        ,
        {"Healthcare Provider Name":"Al Nozha Medical Center","District":"Central Province","Address 1":"Al Nozha District","Branch":"Othman Bin Afan Street","Address 3":"PO Box 977 Riyadh 113222","City":"Riyadh","Telephone No":{" 1":"114509811"}}
        ,
        {"Healthcare Provider Name":"Al Nuairiyah National Clinic","District":"Eastern Province","Address 1":"Prince Turky Bin Abdul Aziz Street,","Branch":"P.O. Box 122","Address 3":"31981","City":"Al Nuairyah","Telephone No":{" 1":"133731100"}}
        ,
        {"Healthcare Provider Name":"Al Ogaly Medical Group - Madina","District":"Northen Province","Address 1":"Gorban Street","Branch":"PO Box 5641","Address 3":"Madina","City":"Madina","Telephone No":{" 1":"148250561"}}
        ,
        {"Healthcare Provider Name":"Al Okhdoud Medical Center","District":"Southren Province","Address 1":"Al Arisah District","Branch":"King Fahad Road","Address 3":"PO BOX 298","City":"Najran","Telephone No":{" 1":"175442000"}}
        ,
        {"Healthcare Provider Name":"Al Osrah International Hospital","District":"Central Province","Address 1":"Orayja Area, Bilal Bin Rabah Street","Branch":"P.O. Box 151518","Address 3":"11777","City":"Riyadh","Telephone No":{" 1":"114311111"}}
        ,
        {"Healthcare Provider Name":"Al Osrah Medical Complex - 1","District":"Central Province","Address 1":"Dhahrat Al-Badiah Area, Al-Nakheel St.","Branch":"P.O. Box 290860","Address 3":"11362","City":"Riyadh","Telephone No":{" 1":"114262233"}}
        ,
        {"Healthcare Provider Name":"Al Osrah Medical Complex - 2","District":"Central Province","Address 1":"Cross of Batha St and Sitteen St","Branch":"Al Owaidah Buildings","Address 3":"PO Box 290860","City":"Riyadh","Telephone No":{" 1":"114572417"}}
        ,
        {"Healthcare Provider Name":"Al Otaich Polyclinic","District":"Eastern Province","Address 1":"Al Mowazel Dist","Branch":"Main St","Address 3":"Box,20094","City":"Al Hasa","Telephone No":{" 1":"135330072"}}
        ,
        {"Healthcare Provider Name":"Al Qadi Dental Clinics","District":"Western Province","Address 1":"Al Bawadi Dist","Branch":"Heraa St","Address 3":"3918","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Qadi Medical Complex","District":"Southren Province","Address 1":"Al Fahad District,","Branch":"P.O. Box 281","Address 3":"","City":"Najran","Telephone No":{" 1":"175231000"}}
        ,
        {"Healthcare Provider Name":"Al Qadi Modern Medical Complex","District":"Southren Province","Address 1":"Al Balad","Branch":"King Abdulaziz Road","Address 3":"PO Box 281","City":"Najran","Telephone No":{" 1":"175431000"}}
        ,
        {"Healthcare Provider Name":"Al Qadi Speciality Hospital","District":"Southren Province","Address 1":"Al Fahad Dist.","Branch":"King Saud Road.","Address 3":"P.O.Box. 281","City":"Najran","Telephone No":{" 1":"175227888"}}
        ,
        {"Healthcare Provider Name":"Al Qasseem National Hospital - Bureidah","District":"Central Province","Address 1":"Al Qassem, Bureidah","Branch":"Ali Bin AbeTaleb Road","Address 3":"PO Box. 748","City":"Qassim","Telephone No":{" 1":"163836100"}}
        ,
        {"Healthcare Provider Name":"Al Qima Medical Complex1- Al Zulfi","District":"Central Province","Address 1":"Al Farouq District","Branch":"Al Ameer Sultan street","Address 3":"P.O Box 57","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Rabwah Medical Center","District":"Central Province","Address 1":"Al Rabwah Dist","Branch":"Omar Bin Abdul Aziz St","Address 3":"PO BOX 261956","City":"Riyadh","Telephone No":{" 1":"114934433"}}
        ,
        {"Healthcare Provider Name":"Al Radwan Dental Center","District":"Central Province","Address 1":"Malaz District, Sitteen Street,","Branch":"","Address 3":"P.O Box 11371","City":"Riyadh","Telephone No":{" 1":"114743441"}}
        ,
        {"Healthcare Provider Name":"Al Rahaily Polyclinic","District":"Western Province","Address 1":"Al Tayyibah District, Kilo 35","Branch":"Madinah Road","Address 3":"PO Box 16369","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Raheema Medical Center","District":"Central Province","Address 1":"Prince Turkey Bin Abdulaziz Second St.","Branch":"Al Marooj Area","Address 3":"","City":"Riyadh","Telephone No":{" 1":"112293232"}}
        ,
        {"Healthcare Provider Name":"Al Rahma Clinic and Medical Lab","District":"Central Province","Address 1":"Al Nahda Dist","Branch":"Suliman Al Farsi St, Exit 30","Address 3":"PO BOX 16386","City":"Riyadh","Telephone No":{" 1":"112260600"}}
        ,
        {"Healthcare Provider Name":"Al Rahma Hospital - Abha","District":"Southren Province","Address 1":"Nahran Street","Branch":"P.O. Box 11200","Address 3":"61321","City":"Abha","Telephone No":{" 1":"172282020"}}
        ,
        {"Healthcare Provider Name":"Al Raqoun Medical Center","District":"Western Province","Address 1":"Al Sharafiyah District","Branch":"Opposite of governorate","Address 3":"PO Box 50061 Jeddah 17199","City":"Jeddah","Telephone No":{" 1":"126140388"}}
        ,
        {"Healthcare Provider Name":"Al Rathawia Medical Center","District":"Central Province","Address 1":"Al Olaya Dist","Branch":"Al Orouba Street","Address 3":"P.O. BOX 119","City":"Riyadh","Telephone No":{" 1":"114163322"}}
        ,
        {"Healthcare Provider Name":"Al Rayah Medical Clinic","District":"Central Province","Address 1":"King Faisal District, Rawdah","Branch":"Abi Said Al Khudri Street,","Address 3":"P.O Box: 11512","City":"Riyadh","Telephone No":{" 1":"112289090"}}
        ,
        {"Healthcare Provider Name":"Al Razi Polyclinic","District":"Central Province","Address 1":"Umm Al Hammam","Branch":"Al Arbaeen St","Address 3":"PO BOX 9448","City":"Riyadh","Telephone No":{" 1":"114824370"}}
        ,
        {"Healthcare Provider Name":"Al Rida Medical General Center","District":"Eastern Province","Address 1":"Omran Town","Branch":"P.O. Box 40001","Address 3":"31982","City":"Al Hasa","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Riyadh Medical Complex","District":"Central Province","Address 1":"Al-Malaz Jarir Area-Fatima","Branch":"P.O. Box 5007","Address 3":"1422","City":"Riyadh","Telephone No":{" 1":"114787070"}}
        ,
        {"Healthcare Provider Name":"Al Ryan International Polyclinic","District":"Central Province","Address 1":"Al Faraby District,","Branch":"Assad Bin Furat Street, Ghorabi Cross","Address 3":"P.O. Box 222","City":"Riyadh","Telephone No":{" 1":"114011833"}}
        ,
        {"Healthcare Provider Name":"Al Ryan Polyclinic","District":"Western Province","Address 1":"Sharafiya Area, Siteen Road","Branch":"P.O. Box 16992","Address 3":"21474","City":"Jeddah","Telephone No":{" 1":"126322848"}}
        ,
        {"Healthcare Provider Name":"Al Ryan Polyclinic - Dammam","District":"Eastern Province","Address 1":"king Saud St","Branch":"Al Khaleej Dist","Address 3":"Dammam","City":"Dammam","Telephone No":{" 1":"138330233"}}
        ,
        {"Healthcare Provider Name":"Al Ryan Polyclinic - Makkah","District":"Western Province","Address 1":"Umulqura Road","Branch":"Rusaifa","Address 3":"Makkah","City":"Makkah","Telephone No":{" 1":"126319475"}}
        ,
        {"Healthcare Provider Name":"Al Sadiq Hospital","District":"Eastern Province","Address 1":"PO Box 36","Branch":"31972","Address 3":"Abo Moosa Al Ansari St","City":"Sayhat","Telephone No":{" 1":"138500160"}}
        ,
        {"Healthcare Provider Name":"Al Saedy Medical Clinic","District":"Western Province","Address 1":"Makkah Taif Street","Branch":"Al Jamoom","Address 3":"PO Box 10","City":"Makkah","Telephone No":{" 1":"125940403"}}
        ,
        {"Healthcare Provider Name":"Al Saedy Medical Clinic - Al Zaher","District":"Western Province","Address 1":"Al Zaher District","Branch":"Prince Talal bin Mansour street, P O Box","Address 3":"P O Box 20899 Makkah - 21955","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Safa Clinic ( Hail )","District":"Central Province","Address 1":"Al Muntazah Dist,","Branch":"King Abdul Aziz St,","Address 3":"Box 4345","City":"Hail","Telephone No":{" 1":"165430006"}}
        ,
        {"Healthcare Provider Name":"Al Safa Social Services Charity Society","District":"Eastern Province","Address 1":"Al Afrah Area, King Khalid Street","Branch":"P.O. Box 140","Address 3":"31921","City":"Safwa","Telephone No":{" 1":"136643028"}}
        ,
        {"Healthcare Provider Name":"Al Safeer Medical For Dental Clinic Co.","District":"Central Province","Address 1":"Olaya Dist","Branch":"Olaya Main Street","Address 3":"PO BOX 285974","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Safwa Dental Clinic - Gizan","District":"Southren Province","Address 1":"Al Rawda District","Branch":"Prince Sultan Street","Address 3":"PO Box 1166","City":"Gizan","Telephone No":{" 1":"173222777"}}
        ,
        {"Healthcare Provider Name":"Al Safwa Hospital","District":"Central Province","Address 1":"Al Sulimanyah Dist","Branch":"King Abdulaziz St.","Address 3":"PO BOX 7476","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Saggaf Optical","District":"Western Province","Address 1":"Al Fayhaa Dist.","Branch":"Old Airport Area -Abdullah Alsulaiman St","Address 3":"P.O.Box.31903","City":"Jeddah","Telephone No":{" 1":"920008969"}}
        ,
        {"Healthcare Provider Name":"Al Saher Modern Clinic - Hail","District":"Central Province","Address 1":"Al Shefa Dist,","Branch":"Al Arbaeen St","Address 3":"Box,915","City":"Hail","Telephone No":{" 1":"165358888"}}
        ,
        {"Healthcare Provider Name":"Al Saif Medical Center","District":"Eastern Province","Address 1":"Al Buhaira Dist.","Branch":"Prince Naif Road","Address 3":"PO Box 3979","City":"Dammam","Telephone No":{" 1":"138383600"}}
        ,
        {"Healthcare Provider Name":"Al Salam Care Polyclinic","District":"Central Province","Address 1":"Al Salam Dist","Branch":"Imam Al Shafee Street","Address 3":"PO BOX 10481","City":"Riyadh","Telephone No":{" 1":"112946167"}}
        ,
        {"Healthcare Provider Name":"Al Salam General Medical Complex","District":"Western Province","Address 1":"Al Rabwah Dist,","Branch":"Prince Majid Street","Address 3":"PO BOX 120400","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Salam Hospital - Makkah","District":"Western Province","Address 1":"Jabal Al Noor Dist.","Branch":"Al Adl St.","Address 3":"P.O.Box 5248","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Salamah & Al Hayat Polyclinic","District":"Northen Province","Address 1":"Al Bathaa Dist, Al Yarmook St.","Branch":"Box. 94","Address 3":"Omluj","City":"Umluj","Telephone No":{" 1":"143820222"}}
        ,
        {"Healthcare Provider Name":"Al Salamah Medical Center","District":"Central Province","Address 1":"Al Shmisee Dist,","Branch":"Aseer St.","Address 3":"PO BOX 3801","City":"Riyadh","Telephone No":{" 1":"114113289"}}
        ,
        {"Healthcare Provider Name":"Al Salman Opticals","District":"Central Province","Address 1":"Jabrah Dist,","Branch":"Al Ashaa St,","Address 3":"PO BOX 3836","City":"Riyadh","Telephone No":{" 1":"114706418"}}
        ,
        {"Healthcare Provider Name":"Al Sameria Polyclinic","District":"Western Province","Address 1":"Al Samer District","Branch":"P.O Box 138848","Address 3":"Jeddah 21323","City":"Jeddah","Telephone No":{" 1":"126283333"}}
        ,
        {"Healthcare Provider Name":"Al Sameria Polyclinic - Al Naseem","District":"Western Province","Address 1":"Al Naseem Dist","Branch":"Ali Al Murtada Street","Address 3":"PO BOX 138848","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Sarah Hospital","District":"Western Province","Address 1":"King Abdulaziz Road,","Branch":"Baljurashi Governorate - 22888","Address 3":"","City":"Baljurashi","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Saraya Medical Polyclinics","District":"Central Province","Address 1":"Al Khubaib Dist.","Branch":"Old Emarah St.","Address 3":"P.O.Box 1386","City":"Bureidah","Telephone No":{" 1":"0163240396-118"}}
        ,
        {"Healthcare Provider Name":"Al Saudi Polyclinic","District":"Central Province","Address 1":"Al Eskan Dist.,","Branch":"Omar Bin Al Khattab St.","Address 3":"PO Box 743 Qassim 81999","City":"Bureidah","Telephone No":{" 1":"163821999"}}
        ,
        {"Healthcare Provider Name":"Al Shaeir General Medical Complex","District":"Southren Province","Address 1":"Al Hizam Al Sharqi, Mokhatat Tahsa","Branch":"PO Box 130","Address 3":"","City":"Bisha","Telephone No":{" 1":"176203555"}}
        ,
        {"Healthcare Provider Name":"Al Shamaal Clinic","District":"Central Province","Address 1":"Aesha binn Abu Bakr Street","Branch":"Al Swide Dis","Address 3":"PO Box 34880 Riyadh 11478","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Shamil Family Polyclinic Group - Shaba'a","District":"Southren Province","Address 1":"Al Shaba'a District, Al Steen Street","Branch":"PO Box 961 Khamis Mushayet 61961","Address 3":"","City":"Khamis Mushyat","Telephone No":{" 1":"172217050"}}
        ,
        {"Healthcare Provider Name":"Al Sharq Medical Clinics Complex","District":"Central Province","Address 1":"Prince Faisal Dis.","Branch":"Prince Bandar Bin Abdulaziz St.","Address 3":"P.O.Box. 93516","City":"Riyadh","Telephone No":{" 1":"112267128"}}
        ,
        {"Healthcare Provider Name":"Al Sharq Medical Clinics Complex","District":"Central Province","Address 1":"Prince Faisal Dis.","Branch":"Prince Bandar Bin Abdulaziz St.","Address 3":"P.O.Box. 93516","City":"Riyadh","Telephone No":{" 1":"112267128"}}
        ,
        {"Healthcare Provider Name":"Al Shefa Hospital","District":"Southren Province","Address 1":"Al Athabyah Dist.","Branch":"King Abdulaziz Road","Address 3":"P.O.Box. 252","City":"Najran","Telephone No":{" 1":"175426666"}}
        ,
        {"Healthcare Provider Name":"Al Shefa Medical Clinic - Afif","District":"Central Province","Address 1":"Al Hai Al Janwbi","Branch":"Main Street","Address 3":"PO BOX 575","City":"Afif","Telephone No":{" 1":"117221777"}}
        ,
        {"Healthcare Provider Name":"Al Shefaa Al Kamel General Medical Clinics","District":"Western Province","Address 1":"Omar Bin Al Khattab St.","Branch":"Al Sharbatly District","Address 3":"PO Box 310","City":"Yanbu","Telephone No":{" 1":"143227062"}}
        ,
        {"Healthcare Provider Name":"Al Shomooly Clinic","District":"Central Province","Address 1":"PO Box 91720","Branch":"11643","Address 3":"Al Morouj Area, King Abdulaziz Road,","City":"Riyadh","Telephone No":{" 1":"114543232"}}
        ,
        {"Healthcare Provider Name":"Al Subhi Specialised Center","District":"Central Province","Address 1":"Al Andalus Dist","Branch":"Prince Bandar Bin Abdul Aziz St","Address 3":"PO BOX 5349","City":"Riyadh","Telephone No":{" 1":"112335000"}}
        ,
        {"Healthcare Provider Name":"Al Taawin Clinic 2","District":"Central Province","Address 1":"Al Aziziah Dist.","Branch":"King Saud St.","Address 3":"PO Box 237","City":"Al Kharj","Telephone No":{" 1":"115447072"}}
        ,
        {"Healthcare Provider Name":"Al Taawin Clinic 3","District":"Central Province","Address 1":"Al Sahnah Dist.","Branch":"General Road","Address 3":"PO Box 237","City":"Al Kharj","Telephone No":{" 1":"115410399"}}
        ,
        {"Healthcare Provider Name":"Al Taawin Polyclinic","District":"Central Province","Address 1":"Al Muntazah Dist.","Branch":"King Saud Road","Address 3":"PO Box 237","City":"Al Kharj","Telephone No":{" 1":"115440408"}}
        ,
        {"Healthcare Provider Name":"Al Takhasossy Polyclinic","District":"Northen Province","Address 1":"Badr Al Shuhada","Branch":"Al Madinah Road King Faisal St.","Address 3":"PO BOX 22","City":"Madina","Telephone No":{" 1":"143322400"}}
        ,
        {"Healthcare Provider Name":"Al Takhsees Dental Clinic - Hail","District":"Central Province","Address 1":"Al Azeezya District","Branch":"King Faisal Street","Address 3":"PO Box 2955","City":"Hail","Telephone No":{" 1":"165324040"}}
        ,
        {"Healthcare Provider Name":"Al Takhsees Medical Clinic - Hail","District":"Central Province","Address 1":"Al Azeezya District,","Branch":"King Faisal Street","Address 3":"","City":"Hail","Telephone No":{" 1":"165434040"}}
        ,
        {"Healthcare Provider Name":"Al Taqwa Medical Complex","District":"Eastern Province","Address 1":"Al Zohor District, 11th Street","Branch":"PO Box 2169 Dammam 31451","Address 3":"","City":"Dammam","Telephone No":{" 1":"138096464"}}
        ,
        {"Healthcare Provider Name":"Al Tarf Charity Dispensary (Al Ahsa)","District":"Eastern Province","Address 1":"Al Qadeh District","Branch":"Main Street","Address 3":"PO Box 878 Al Hasa 31911","City":"Al Hasa","Telephone No":{" 1":"135393200"}}
        ,
        {"Healthcare Provider Name":"Al Tayyar Polyclinic","District":"Central Province","Address 1":"Al Quwaiyah","Branch":"King Abdulaziz Road","Address 3":"PO BOX 37095","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Themal Medical Group - Abha","District":"Southren Province","Address 1":"Al Sodah Entrance","Branch":"Al Hezam Al Daeari","Address 3":"PO BOX 2731","City":"Abha","Telephone No":{" 1":"172316666"}}
        ,
        {"Healthcare Provider Name":"Al Themal Medical Group - Khamis Mushayt","District":"Southren Province","Address 1":"Abha Al Khamis Road","Branch":"Infront of Al Garawi Souq","Address 3":"PO Box 11888","City":"Khamis Mushyat","Telephone No":{" 1":"172226666"}}
        ,
        {"Healthcare Provider Name":"Al Thowini Clinic","District":"Central Province","Address 1":"Al Naseem Al Garbi Dist,","Branch":"Osama Bin Zayd St.","Address 3":"PO BOX 6286","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Thukair Medical Center","District":"Eastern Province","Address 1":"Bin Khaldon District","Branch":"Street 17","Address 3":"PO Box 185 Dammam 31411","City":"Dammam","Telephone No":{" 1":"138427461"}}
        ,
        {"Healthcare Provider Name":"Al W.S.J Medical","District":"Central Province","Address 1":"Riyadh, Exit 20, Al Aziziyah Dist.","Branch":"Rasheed Mohd Rasheed St.","Address 3":"","City":"Riyadh","Telephone No":{" 1":"118033370"}}
        ,
        {"Healthcare Provider Name":"Al Wafa Complex Specialist","District":"Southren Province","Address 1":"Al Mashaliyah Dist.","Branch":"King Abdulaziz Road - Al Husayniyah","Address 3":"P.O.Box. 5057","City":"Najran","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Wajha Specialized Medical Complex","District":"Eastern Province","Address 1":"Al Rawdah Dist","Branch":"Al Dahran Al Jubail branch street","Address 3":"P.O Box 6493","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Warood Medical Center","District":"Central Province","Address 1":"PO Box 286936","Branch":"11323","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Waseet Medical Group","District":"Southren Province","Address 1":"North Dist","Branch":"Plan 6","Address 3":"PO Box 1314","City":"Gizan","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Washem Polyclinic Company","District":"Central Province","Address 1":"King Faisal Street","Branch":"El Morbe District","Address 3":"","City":"Riyadh","Telephone No":{" 1":"114036673"}}
        ,
        {"Healthcare Provider Name":"Al Watani M.P.C. (Najran)","District":"Southren Province","Address 1":"King Abd Road","Branch":"P.O. Box 218","Address 3":"","City":"Najran","Telephone No":{" 1":"175234000"}}
        ,
        {"Healthcare Provider Name":"Al Wattan Clinic - Taif","District":"Western Province","Address 1":"Shihar Dist,","Branch":"Al Seteen Street.","Address 3":"PO BOX 45","City":"Taif","Telephone No":{" 1":"127490660"}}
        ,
        {"Healthcare Provider Name":"Al Wattan Clinic - Taif","District":"Western Province","Address 1":"Shihar Dist,","Branch":"Al Seteen Street.","Address 3":"PO BOX 45","City":"Taif","Telephone No":{" 1":"127490660"}}
        ,
        {"Healthcare Provider Name":"Al Wattan Medical Complex 1","District":"Central Province","Address 1":"Manfouha Area, East of Otaiga market","Branch":"P.O. Box 17045","Address 3":"11484","City":"Riyadh","Telephone No":{" 1":"114588444"}}
        ,
        {"Healthcare Provider Name":"Al Wattan Medical Complex 2","District":"Central Province","Address 1":"Al Rawabi, Exit 14 Eneza St.","Branch":"P.O. Box 17045","Address 3":"11484","City":"Riyadh","Telephone No":{" 1":"114588444"}}
        ,
        {"Healthcare Provider Name":"Al Wazzan Vision","District":"Eastern Province","Address 1":"Al Dwaser Dis","Branch":"Al Dhran Street","Address 3":"PO Box 984 Dammam 31421","City":"Dammam","Telephone No":{" 1":"138524056"}}
        ,
        {"Healthcare Provider Name":"Al Yarmook Medical Center 1","District":"Central Province","Address 1":"Al Yarmook District","Branch":"Al Nasar Street","Address 3":"PO Box. 481 Riyadh 11311","City":"Riyadh","Telephone No":{" 1":"12490484"}}
        ,
        {"Healthcare Provider Name":"Al Yasmin Polyclinic","District":"Western Province","Address 1":"Old Makkah Road","Branch":"Kilo 14","Address 3":"","City":"Jeddah","Telephone No":{" 1":"126244091"}}
        ,
        {"Healthcare Provider Name":"Al Yousif Hospital","District":"Eastern Province","Address 1":"Thuqbah-Al Bayunia","Branch":"Al Mubaraz Street cross 27/28","Address 3":"POBOX 1692","City":"Khobar","Telephone No":{" 1":"138642751"}}
        ,
        {"Healthcare Provider Name":"Al Zafer Hospital","District":"Southren Province","Address 1":"Al-Khalidya , Main Road","Branch":"P.O. Box 1107","Address 3":"","City":"Najran","Telephone No":{" 1":"175429999"}}
        ,
        {"Healthcare Provider Name":"Al Zafer Hospital - Jeddah","District":"Western Province","Address 1":"Prince Fawaz Dist","Branch":"Makkah Road","Address 3":"","City":"","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Zafer Polyclinic - Al Sulaymania","District":"Western Province","Address 1":"King Abdullah Street, Al Sulaymania","Branch":"PO Box 33618","Address 3":"21458","City":"Jeddah","Telephone No":{" 1":"126405565"}}
        ,
        {"Healthcare Provider Name":"Al Zaher General Polyclinic","District":"Western Province","Address 1":"alzahra Dist","Branch":"Al Diyafah St","Address 3":"PO Box. 17430","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Zahra General Hospital - Qatif","District":"Eastern Province","Address 1":"Attoubi District, King Faisal Street,","Branch":"P.O. Box 887","Address 3":"31911","City":"Qatif","Telephone No":{" 1":"138555000"}}
        ,
        {"Healthcare Provider Name":"Al Zahra Hospital - Madinah","District":"Northen Province","Address 1":"Al Awali Street","Branch":"P.O. Box 1549","Address 3":"","City":"Madina","Telephone No":{" 1":"148488808"}}
        ,
        {"Healthcare Provider Name":"Al Zubaidi General Medical Complex - Baljurashi","District":"Western Province","Address 1":"City Center","Branch":"King Saud St.","Address 3":"P.O.Box 66","City":"Baljurashi","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Zubaidi General Medical Complex - Jeddah","District":"Western Province","Address 1":"Al Azizia District, Al Sitteen Street","Branch":"PO Box 55071","Address 3":"21534","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Al Zubaidi Medical Center","District":"Southren Province","Address 1":"Al Qonfuza","Branch":"Al Gharbiyah District","Address 3":"","City":"Ghonfodah","Telephone No":{" 1":"177331071"}}
        ,
        {"Healthcare Provider Name":"Al Zulfi Polyclinic","District":"Central Province","Address 1":"Al Arbaen Street, Riyadh Road","Branch":"PO Box 343","Address 3":"Al Zulfi 11937","City":"Riyadh","Telephone No":{" 1":"164226666"}}
        ,
        {"Healthcare Provider Name":"Alam Ram Medical Complex - Dammam","District":"Eastern Province","Address 1":"Al Faysaliah Dist.","Branch":"Omar Bin Alkhatab St.","Address 3":"P.O.Box. 23074","City":"Dammam","Telephone No":{" 1":"138425701"}}
        ,
        {"Healthcare Provider Name":"Alawi Tunsi & Bros. Hospital","District":"Western Province","Address 1":"Alazizyah South Area, Abdullah Khayat St","Branch":"P.O. Box 919","Address 3":"1162","City":"Makkah","Telephone No":{" 1":"125587777"}}
        ,
        {"Healthcare Provider Name":"Alelaj International Medical","District":"Central Province","Address 1":"Al Shuhada District","Branch":"Abu Jafar Al Mansour St.","Address 3":"P.O.Box 68076","City":"Riyadh","Telephone No":{" 1":"112404222"}}
        ,
        {"Healthcare Provider Name":"Ali Abdullhadi Dajam Dental Clinic","District":"Southren Province","Address 1":"Khamis Mushyat","Branch":"King Abdullah St.","Address 3":"B.O.Box. 61311","City":"Khamis Mushyat","Telephone No":{" 1":"172318666"}}
        ,
        {"Healthcare Provider Name":"Ali Ahmed Al Haddad & Partners Co.","District":"Eastern Province","Address 1":"Al Faisaliah Dist,","Branch":"Al Ahsa","Address 3":"PO BOX 3762","City":"Al Hasa","Telephone No":{" 1":"135306631"}}
        ,
        {"Healthcare Provider Name":"Ali Zafer Medical General Complex","District":"Western Province","Address 1":"Al wazeriah Dis .","Branch":"Jeddah","Address 3":"P.O.Box . 34834","City":"Jeddah","Telephone No":{" 1":"126809912"}}
        ,
        {"Healthcare Provider Name":"Allied Diagnostics","District":"Central Province","Address 1":"Salah Al Deen Dist","Branch":"King Abdulaziz St","Address 3":"PO BOX 25639","City":"Riyadh","Telephone No":{" 1":"114942990"}}
        ,
        {"Healthcare Provider Name":"Alrazi Clinics","District":"Eastern Province","Address 1":"Al Arifi Area","Branch":"Jeddah St.","Address 3":"P.O.Box 2833","City":"Jubail","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Alsaaed General Medical Center","District":"Western Province","Address 1":"Al Eteybeya Dis","Branch":"Malqeya","Address 3":"Po Box 8126","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Amass Medical Polyclinic","District":"Northen Province","Address 1":"Al Shalhob District","Branch":"King Fahed Street","Address 3":"","City":"Sakaka","Telephone No":{" 1":"146256565"}}
        ,
        {"Healthcare Provider Name":"Amass Medical Polyclinic - Arar","District":"Northen Province","Address 1":"Al Aziziyah District","Branch":"PO Box 3212 Arar 42421","Address 3":"","City":"Arar","Telephone No":{" 1":"146638383"}}
        ,
        {"Healthcare Provider Name":"Amin Abdullah Ahmed Sheikh Naser Dental Clinic","District":"Eastern Province","Address 1":"Al Montazah Dist.","Branch":"King Faisal St.","Address 3":"B.O.Box 36","City":"Sayhat","Telephone No":{" 1":"138500160"}}
        ,
        {"Healthcare Provider Name":"Amwaj Baish Medical Complex","District":"Southren Province","Address 1":"P O Box 302","Branch":"Bish","Address 3":"","City":"Gizan","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Anak Medical Dispensary","District":"Eastern Province","Address 1":"Anak, Al Qismah St","Branch":"Box 6084","Address 3":"Anak 31481","City":"Qatif","Telephone No":{" 1":"138368883"}}
        ,
        {"Healthcare Provider Name":"Andalusia Dental Center - Le Chateau","District":"Western Province","Address 1":"Le Chateau Center Office (6),Tahliah St","Branch":"Al Andalus District","Address 3":"Box 33424","City":"Jeddah","Telephone No":{" 1":"122611111"}}
        ,
        {"Healthcare Provider Name":"Andalusia Dental Center -1","District":"Western Province","Address 1":"Macaronah Street","Branch":"P.O. Box 31375","Address 3":"21433","City":"Jeddah","Telephone No":{" 1":"126702777"}}
        ,
        {"Healthcare Provider Name":"Angel of Mercy Medical Company","District":"Central Province","Address 1":"Al Rabwah Dist","Branch":"Prince Salaman Bin Abdul Aziz Street","Address 3":"PO BOX 145","City":"Riyadh","Telephone No":{" 1":"116522888"}}
        ,
        {"Healthcare Provider Name":"Arab Medical Dar","District":"Central Province","Address 1":"Olaya, Abdul Aziz Bin Mosaed Street","Branch":"PO Box 55309","Address 3":"Riyadh, 1134","City":"Riyadh","Telephone No":{" 1":"114160011"}}
        ,
        {"Healthcare Provider Name":"Arabian Dental Clinic","District":"Central Province","Address 1":"Olaya Dist,","Branch":"Olaya Main Street","Address 3":"PO BOX 53732","City":"Riyadh","Telephone No":{" 1":"114650748"}}
        ,
        {"Healthcare Provider Name":"Arrawda Hospital","District":"Eastern Province","Address 1":"Al Tubishi Dist","Branch":"First Street","Address 3":"Box 35320","City":"Dammam","Telephone No":{" 1":"138346555"}}
        ,
        {"Healthcare Provider Name":"Arrawdha Medical Complex - Dammam","District":"Eastern Province","Address 1":"Al Thubaishi - First St.","Branch":"P.O. Box 35320","Address 3":"31488","City":"Dammam","Telephone No":{" 1":"138346555"}}
        ,
        {"Healthcare Provider Name":"Artal Dental Clinic","District":"Eastern Province","Address 1":"P.O. Box 4596","Branch":"Khobar 31952","Address 3":"King Abdulaziz St, Saudi Arabia","City":"Khobar","Telephone No":{" 1":"138999914"}}
        ,
        {"Healthcare Provider Name":"AS Salama Hospital","District":"Eastern Province","Address 1":"North Khobar Dis, Prince Mansour St,","Branch":"P.O. Box 296","Address 3":"31952","City":"Khobar","Telephone No":{" 1":"138641011"}}
        ,
        {"Healthcare Provider Name":"Asfan Polyclinic","District":"Western Province","Address 1":"Al Barth District, Main Street","Branch":"PO Box 8","Address 3":"","City":"Makkah","Telephone No":{" 1":"122652999"}}
        ,
        {"Healthcare Provider Name":"Ashbelia Polyclinic","District":"Central Province","Address 1":"Ashbelia District","Branch":"King Abdullah Road, Exit 10","Address 3":"PO BOX 226999","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Ashfa Medical Complex","District":"Western Province","Address 1":"Al Baha - Al Mandaq - Al Nasba'","Branch":"Main Road","Address 3":"P.O.Box. 172","City":"Al Baha","Telephone No":{" 1":"177513525"}}
        ,
        {"Healthcare Provider Name":"Aster Sanad Hospital for Medical Care","District":"Central Province","Address 1":"Al Hamra Dist","Branch":"Imam Abdullah Bin Soud St","Address 3":"PO BOX 91395","City":"Riyadh","Telephone No":{" 1":"112407778"}}
        ,
        {"Healthcare Provider Name":"Atba Al Asr General Medical Complex","District":"Western Province","Address 1":"P O Box 53295, Makkah - 21955","Branch":"North Al Aziziyah,","Address 3":"Behind Al Qarat market","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Atlas International Medical Complex","District":"Central Province","Address 1":"Al Sahab Street","Branch":"Al Munisiyah Area","Address 3":"Riyadh - 85111","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Attadawe Clinic","District":"Central Province","Address 1":"Al Qasim - Al Bukairiah","Branch":"P.O. Box 269","Address 3":"","City":"Al Bukairiah","Telephone No":{" 1":"163351122"}}
        ,
        {"Healthcare Provider Name":"Avicena Dental Center - Al Rakah","District":"Eastern Province","Address 1":"Al Rakah","Branch":"Rakkah District ,","Address 3":"Khalid ibn Al ealeed sreet","City":"Khobar","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Avicena Dental Center - Dammam 1","District":"Eastern Province","Address 1":"Al Amamra District,","Branch":"King Abdulaziz Street","Address 3":"","City":"Dammam","Telephone No":{" 1":"138338640"}}
        ,
        {"Healthcare Provider Name":"Avicena Dental Center - Dammam 2","District":"Eastern Province","Address 1":"Dammam 2","Branch":"Jameyeen district","Address 3":"Ali Bin Talib Street","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Avicena Dental Center - Industrial Jubail","District":"Eastern Province","Address 1":"Industrial Jubail","Branch":"Fanateer District,","Address 3":"Al Ahsa Street","City":"Jubail","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Avicena Dental Center - Jubail","District":"Eastern Province","Address 1":"Jubail","Branch":"Abo Ali Street","Address 3":"","City":"Jubail","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Avicena Dental Center - Qatif","District":"Eastern Province","Address 1":"Qatif","Branch":"Al Quds Street","Address 3":"","City":"Qatif","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Aya Specialist Hospital","District":"Western Province","Address 1":"Al Mohammadiyah Dist.","Branch":"Prince Sultan Road","Address 3":"P.O.Box. 55592","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Aziz Medical Dispensary - Hofuf","District":"Eastern Province","Address 1":"P.O 390","Branch":"Al Ahsa 31982","Address 3":"","City":"Hofuf","Telephone No":{" 1":"135827963"}}
        ,
        {"Healthcare Provider Name":"Azizia Medical Clinic - Al Ahli","District":"Central Province","Address 1":"PO Box 3161","Branch":"Al Kharj Road","Address 3":"11471","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Badghaish Eyecare","District":"Eastern Province","Address 1":"King Fahad Street","Branch":"Al Shamali Dist, Al Khobar","Address 3":"PO BOX 65","City":"Khobar","Telephone No":{" 1":"138950577"}}
        ,
        {"Healthcare Provider Name":"Badr Al Jazeera Polyclinic","District":"Eastern Province","Address 1":"Al Qatif District","Branch":"Badr Street","Address 3":"PO Box 61099 Qatif 31911","City":"Qatif","Telephone No":{" 1":"138635000"}}
        ,
        {"Healthcare Provider Name":"Badr Al khaleej Medical Center","District":"Eastern Province","Address 1":"Jubail - Al Danah Dst","Branch":"Makkah Al moukaramah St .","Address 3":"P.O Box 35095 Jubail 31488","City":"Jubail","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Badr Al Tamam Polyclinic","District":"Western Province","Address 1":"Al Sharafia District,","Branch":"P.O Box 104364","Address 3":"Jeddah 21331","City":"Jeddah","Telephone No":{" 1":"126452695"}}
        ,
        {"Healthcare Provider Name":"Badr Al-Rabie Dispensary","District":"Eastern Province","Address 1":"King Saud Street","Branch":"PO Box 35095","Address 3":"31488","City":"Dammam","Telephone No":{" 1":"138326000"}}
        ,
        {"Healthcare Provider Name":"Badruddin Polyclinic - Batha'a","District":"Central Province","Address 1":"Batha Street","Branch":"Opposite Jamaal Center","Address 3":"","City":"Riyadh","Telephone No":{" 1":"114053613"}}
        ,
        {"Healthcare Provider Name":"Badruddin Polyclinic - Bawadi","District":"Western Province","Address 1":"Sitteen St,","Branch":"Before Al Jawad Al Abyad","Address 3":"Bawadi","City":"Jeddah","Telephone No":{" 1":"126541638"}}
        ,
        {"Healthcare Provider Name":"Bagedo Medical Clinics","District":"Western Province","Address 1":"Al Rawdah Dist","Branch":"Al Nahda Street ( Magraa Al Saeel )","Address 3":"PO BOX 1215","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Balghasoon Polyclinic","District":"Western Province","Address 1":"Old Airport Area","Branch":"Al Thaghar Area","Address 3":"PO Box 11742","City":"Jeddah","Telephone No":{" 1":"126327100"}}
        ,
        {"Healthcare Provider Name":"Balsam Elaj Generl Medical Complex","District":"Western Province","Address 1":"Al Rawdah Dist","Branch":"Al Rawdah St,Infront of Civil Office","Address 3":"PO BOX 25","City":"Khorma","Telephone No":{" 1":"128323346"}}
        ,
        {"Healthcare Provider Name":"Bany Malik Polyclinic","District":"Western Province","Address 1":"Bany Malik Dist","Branch":"Al Souk Street","Address 3":"PO BOX 16553","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Baqaa General Medical Complex","District":"Central Province","Address 1":"Al Nahar Dist,","Branch":"Main Street","Address 3":"PO BOX 137","City":"Hail","Telephone No":{" 1":"165272255"}}
        ,
        {"Healthcare Provider Name":"Basamat Dental Clinic","District":"Eastern Province","Address 1":"Al Raka Al Shamliah District","Branch":"Khalid Bin Al Waleed St- dosary buliding","Address 3":"PO Box 77082","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Basma Al Thuraya Medical Complex","District":"Eastern Province","Address 1":"Tayba Dst - Abdulrahman Bin Ouf St","Branch":"P.O.Box 2181 Dammam 31488","Address 3":"","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Basma Al Thuraya Medical Complex - Al Khafji","District":"Eastern Province","Address 1":"PO Box 911","Branch":"31971","Address 3":"Al Mohamadiah Dis, Al Baladiah St,","City":"Khafji","Telephone No":{" 1":"137663555"}}
        ,
        {"Healthcare Provider Name":"Basmalah Al Nour Dental Center","District":"Southren Province","Address 1":"Al Faisaliyah District","Branch":"Abu Bakr Al Sideq Street","Address 3":"","City":"Najran","Telephone No":{" 1":"175238888"}}
        ,
        {"Healthcare Provider Name":"Basmalah Al Nour For Dental Center - Tabuk","District":"Northen Province","Address 1":"Al Warood Dist","Branch":"Khalid Al Sudari Street","Address 3":"PO BOX","City":"Tabuk","Telephone No":{" 1":"175238888"}}
        ,
        {"Healthcare Provider Name":"Basmat Al Farabi Dental Clinics","District":"Northen Province","Address 1":"Al Doima Dist","Branch":"Prince Abdul Majeed Bin Abdul Aziz St","Address 3":"Box 1860","City":"Madina","Telephone No":{" 1":"148666640"}}
        ,
        {"Healthcare Provider Name":"Basmat Al Farabi Dental Clinics (5)","District":"Central Province","Address 1":"Al Naseem Al Garbi Dist,","Branch":"Hassan Bin Thabit St","Address 3":"PO BOX 34945","City":"Riyadh","Telephone No":{" 1":"112098183"}}
        ,
        {"Healthcare Provider Name":"Basmat Al Farabi Dental Clinics 2","District":"Central Province","Address 1":"Al Aziziah Dist","Branch":"Al Nasr Street","Address 3":"PO BOX 11514","City":"Riyadh","Telephone No":{" 1":"114959485"}}
        ,
        {"Healthcare Provider Name":"Basmat Al Farabi Dental Clinics 3","District":"Central Province","Address 1":"Al Wadi Dist","Branch":"Red Sea Street","Address 3":"PO BOX 11514","City":"Riyadh","Telephone No":{" 1":"112105017"}}
        ,
        {"Healthcare Provider Name":"Basmat Al Farabi Dental Clinics 4","District":"Central Province","Address 1":"Al Badeea'a District","Branch":"PO Box 54223 Riyadh 11514","Address 3":"","City":"Riyadh","Telephone No":{" 1":"112475371"}}
        ,
        {"Healthcare Provider Name":"Basmat Al Farabi Dental Clinics1","District":"Central Province","Address 1":"Al Dereya Dist","Branch":"King Abdulaziz Street","Address 3":"PO BOX 54223","City":"Al Diriaya","Telephone No":{" 1":"114862828"}}
        ,
        {"Healthcare Provider Name":"Basmat Al Farabi Medical Complex","District":"Central Province","Address 1":"Dhahrat Al Badiah District","Branch":"Sheikh Saleh Bin AbdulAziz Street","Address 3":"PO BOX 121252","City":"Riyadh","Telephone No":{" 1":"114318254"}}
        ,
        {"Healthcare Provider Name":"Bassam Medical Center","District":"Northen Province","Address 1":"Bassam Medical Center","Branch":"Al balad district","Address 3":"Al emam mohammed bin saud street","City":"Duba","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Bateel Dental Clinic 2","District":"Western Province","Address 1":"Ali Bin Abe Taleb Street","Branch":"","Address 3":"","City":"Yanbu","Telephone No":{" 1":"143225566"}}
        ,
        {"Healthcare Provider Name":"BATEEL DENTAL CLINICS 1","District":"Western Province","Address 1":".","Branch":"","Address 3":"","City":"Yanbu","Telephone No":{" 1":"143901902"}}
        ,
        {"Healthcare Provider Name":"Bateel Medical Complex","District":"Western Province","Address 1":"Al Sooq Dist.","Branch":"Old transportation St.","Address 3":"P.O.Box. 25753","City":"Rabigh","Telephone No":{" 1":"143225566"}}
        ,
        {"Healthcare Provider Name":"Beauty Care Center","District":"Eastern Province","Address 1":"Al Rakah Dist","Branch":"Abdulrahman Al Dakhel St","Address 3":"PO BOX 9599","City":"Khobar","Telephone No":{" 1":"138690333"}}
        ,
        {"Healthcare Provider Name":"Beverly Clinics","District":"Western Province","Address 1":"Al Rawda Dist","Branch":"Prince Saudi Al Faisal","Address 3":"Po Box 2550","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Bin Rushd Medical Center","District":"Central Province","Address 1":"Al Olaya District","Branch":"King Fahad Road","Address 3":"PO Box 68881 Riyadh 11537","City":"Riyadh","Telephone No":{" 1":"114613131"}}
        ,
        {"Healthcare Provider Name":"Bin Rushd Medical Center - 2","District":"Central Province","Address 1":"Southern sub ring road, Namar Unit No. 2","Branch":"Southern ring road, between Exit 25 & 24","Address 3":"Building no. 2677","City":"Riyadh","Telephone No":{" 1":"114250506"}}
        ,
        {"Healthcare Provider Name":"Bin Rushd Medical Center - Jeddah","District":"Western Province","Address 1":"King Road, King Tower, Al Shatie Dist","Branch":"P O Box 23412","Address 3":"","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Bin Rushd Medical Center- Khamis Mushyat","District":"Southren Province","Address 1":"Om Sarar Dist. Al Riyadh Road","Branch":"P.O.Box 3876","Address 3":"","City":"Khamis Mushyat","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Bright Smile Dental Clinics","District":"Central Province","Address 1":"Al Mukhattat Al Jadeed","Branch":"Main Street","Address 3":"PO BOX 540","City":"Hail","Telephone No":{" 1":"115275550"}}
        ,
        {"Healthcare Provider Name":"Bugshan Vision","District":"Western Province","Address 1":"Al Zahra District","Branch":"Al Malek Road","Address 3":"PO Box 14105 Jeddah 21424","City":"Jeddah","Telephone No":{" 1":"126670921"}}
        ,
        {"Healthcare Provider Name":"Burj Al Shifa Dammam","District":"Eastern Province","Address 1":"Al Adammah Dis.","Branch":"Prince Mansour St.","Address 3":"B.O.Box. 60044","City":"Dammam","Telephone No":{" 1":"138060052"}}
        ,
        {"Healthcare Provider Name":"Canadian Medical Center","District":"Eastern Province","Address 1":"Ohod Distict","Branch":"Omar Ibn Al Khattab Street M/A476","Address 3":"PO Box 3300 Dammam 31471","City":"Dammam","Telephone No":{" 1":"138188320"}}
        ,
        {"Healthcare Provider Name":"Canadian Medical Center Company - Al khobar","District":"Eastern Province","Address 1":"Al Khozama Dis.","Branch":"King Khalid St.","Address 3":"P.O.Box. 3156","City":"Khobar","Telephone No":{" 1":"138353256"}}
        ,
        {"Healthcare Provider Name":"Cardio Vascular Center","District":"Eastern Province","Address 1":"Al Adamah Al Jnobeya","Branch":"Social Insurance Building","Address 3":"Suiute 101, Dhahran Street","City":"Dammam","Telephone No":{" 1":"138276195"}}
        ,
        {"Healthcare Provider Name":"Care Home Complex","District":"Central Province","Address 1":"Al Nazeem Dis","Branch":"Al Nadwa Street.","Address 3":"","City":"Riyadh","Telephone No":{" 1":"112465642"}}
        ,
        {"Healthcare Provider Name":"Central Medical Care","District":"Eastern Province","Address 1":"Al Joharah Dist.","Branch":"Firas Bin Al Nadar St.","Address 3":"P.O.Box. 684","City":"Khobar","Telephone No":{" 1":"138992403"}}
        ,
        {"Healthcare Provider Name":"Ceram Dental Clinics","District":"Eastern Province","Address 1":"Fathi Al Khudair bulding complex","Branch":"Al Bustan Dist.","Address 3":"Bahja bilmbrz St.","City":"Al Hasa","Telephone No":{" 1":"135731111"}}
        ,
        {"Healthcare Provider Name":"Cham Dental Center - Dammam","District":"Eastern Province","Address 1":"Al Rayan Dist.","Branch":"Othman Bin Affan St.","Address 3":"P.O.Box. 4619","City":"Dammam","Telephone No":{" 1":"138335533"}}
        ,
        {"Healthcare Provider Name":"Cham Dental Center - Khobar","District":"Eastern Province","Address 1":"Al Hazam Al Akhdar District","Branch":"PO Box 3096 Khobar 31982","Address 3":"","City":"Khobar","Telephone No":{" 1":"138878676"}}
        ,
        {"Healthcare Provider Name":"Cham Dental Center 2 - Dammam","District":"Eastern Province","Address 1":"P O Box 4619","Branch":"Dammam - 31952","Address 3":"","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Childs Well Therapy Center - Dammam","District":"Eastern Province","Address 1":"Al Dammam","Branch":"Othman Bin Afan St.","Address 3":"P.O.Box. 4327","City":"Dammam","Telephone No":{" 1":"138300002"}}
        ,
        {"Healthcare Provider Name":"Class Optical","District":"Central Province","Address 1":"Olaya District","Branch":"General Street","Address 3":"PO Box: 61193","City":"Riyadh","Telephone No":{" 1":"114721831"}}
        ,
        {"Healthcare Provider Name":"Clinic 9 Medical Center","District":"Eastern Province","Address 1":"Dammam","Branch":"al khaleg St. 32433 Box 9232","Address 3":"Al Mohammadiah Dist.","City":"Dammam","Telephone No":{" 1":"138393320"}}
        ,
        {"Healthcare Provider Name":"Cmai Medical Center","District":"Central Province","Address 1":"Al Falah Dist","Branch":"Othman Bin Afan Street","Address 3":"PO BOX 84831","City":"Riyadh","Telephone No":{" 1":"112005333"}}
        ,
        {"Healthcare Provider Name":"Consultant Radiologists (Riyadh Scan)","District":"Central Province","Address 1":"King Fahad Road","Branch":"Opp. King Fahad Library","Address 3":"PO Box 60242","City":"Riyadh","Telephone No":{" 1":"114612266"}}
        ,
        {"Healthcare Provider Name":"Consulting Clinics","District":"Central Province","Address 1":"PO Box 61022","Branch":"11565","Address 3":"","City":"Riyadh","Telephone No":{" 1":"114659100"}}
        ,
        {"Healthcare Provider Name":"Crazy Optical Co.","District":"Central Province","Address 1":"Olaya Dist,","Branch":"Prince Sultan St.","Address 3":"PO BOX 34011","City":"Riyadh","Telephone No":{" 1":"12931190"}}
        ,
        {"Healthcare Provider Name":"Creative Medical Specialized Center","District":"Eastern Province","Address 1":"Omar Bin Al Khattab St.","Branch":"P.O.Box 2615","Address 3":"Dammam 31461","City":"Dammam","Telephone No":{" 1":"138344428"}}
        ,
        {"Healthcare Provider Name":"Crystal Dental Clinic","District":"Eastern Province","Address 1":"Princess Faisal Bin Fahad St 28","Branch":"North Khobar Dst","Address 3":"P.O.Box 457 Khobar 31952","City":"Khobar","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Dalia Medical Complex - Jeddah","District":"Western Province","Address 1":"Al Rawdah Dist.","Branch":"Nahdat Al Islah St.","Address 3":"P.O.Box 2572","City":"Jeddah","Telephone No":{" 1":"012 920002612"}}
        ,
        {"Healthcare Provider Name":"Dallah Hospital - Namar","District":"Central Province","Address 1":"Dirab Road, Namar, Riyadh - 14963 - 7400","Branch":"","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Dama Medical Center","District":"Northen Province","Address 1":"Al Madinah - Hai Al shuhadaa","Branch":"King Abdullah Street .","Address 3":"P.O. Box .6090","City":"Madina","Telephone No":{" 1":"148367111"}}
        ,
        {"Healthcare Provider Name":"Dammam National Dispensary","District":"Eastern Province","Address 1":"Al Jalwyia District","Branch":"Ahmed Altermathy Street","Address 3":"PO Box 4576","City":"Dammam","Telephone No":{" 1":"138434090"}}
        ,
        {"Healthcare Provider Name":"Dammam Private Medical Complex","District":"Eastern Province","Address 1":"Madinat Ommal","Branch":"P.O. Box 3743","Address 3":"31481","City":"Dammam","Telephone No":{" 1":"138056888"}}
        ,
        {"Healthcare Provider Name":"Dammam Scan Center","District":"Eastern Province","Address 1":"Prince Mohammed Bin Fahad Street","Branch":"Tabishi District","Address 3":"P.O. Box 35318","City":"Dammam","Telephone No":{" 1":"138301718"}}
        ,
        {"Healthcare Provider Name":"Danat Al Sahraa Medical Company","District":"Eastern Province","Address 1":"Al Janoubiya District","Branch":"King Faisal Street, West","Address 3":"PO Box 922","City":"Jubail","Telephone No":{" 1":"133620039"}}
        ,
        {"Healthcare Provider Name":"Dar Al Afia Medical Group Complex","District":"Eastern Province","Address 1":"Al Jawharah Dist","Branch":"Khaleej Road, Opposite Extra Mall","Address 3":"Box 72494","City":"Dammam","Telephone No":{" 1":"138050101"}}
        ,
        {"Healthcare Provider Name":"Dar Al Afia Optical -Dammam","District":"Eastern Province","Address 1":"Al Dammam","Branch":"Al Khaleej Al Arabi St.","Address 3":"P.O.Box. 72494","City":"Dammam","Telephone No":{" 1":"138094488"}}
        ,
        {"Healthcare Provider Name":"Dar Al Elaj Clinics","District":"Central Province","Address 1":"Al Sawadi Dist","Branch":"Aishah Bint Abi Baker ST","Address 3":"PO BOX 2529","City":"Riyadh","Telephone No":{" 1":"114258933"}}
        ,
        {"Healthcare Provider Name":"Dar Al Hekmah Medical Center","District":"Eastern Province","Address 1":"First Street","Branch":"Abdullah Fouad Dis","Address 3":"P.O Box 1015","City":"Dammam","Telephone No":{" 1":"138264749"}}
        ,
        {"Healthcare Provider Name":"Dar Al Qasr Optical Center","District":"Central Province","Address 1":"King Abdullah St.","Branch":"Ashbylia Dist.","Address 3":"P.O.Box. 125270","City":"Riyadh","Telephone No":{" 1":"114963877"}}
        ,
        {"Healthcare Provider Name":"Dar Al Salam Medical Clinic","District":"Central Province","Address 1":"King Fahad Road","Branch":"PO Box 182","Address 3":"11942","City":"Al Kharj","Telephone No":{" 1":"115448663"}}
        ,
        {"Healthcare Provider Name":"Dar Al Shefa Clinic","District":"Central Province","Address 1":"Old Kharj Road","Branch":"PO Box 4398","Address 3":"11491 Riyadh","City":"Riyadh","Telephone No":{" 1":"114989220"}}
        ,
        {"Healthcare Provider Name":"Dar Al Shifa Hospital","District":"Central Province","Address 1":"Al Khazan District","Branch":"Al Khazan Street","Address 3":"PO Box 4398 Riyadh 11491","City":"Riyadh","Telephone No":{" 1":"14012029"}}
        ,
        {"Healthcare Provider Name":"Dar Al Shifa Polyclinic - Arar","District":"Northen Province","Address 1":"Badnah Dist","Branch":"","Address 3":"Po Box 1527","City":"Arar","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Dar Al Shuba Polyclinic","District":"Central Province","Address 1":"Al Khozama Dist","Branch":"King Soud Road Next to Al Othim Market","Address 3":"PO BOX 7827","City":"Al Kharj","Telephone No":{" 1":"115481070"}}
        ,
        {"Healthcare Provider Name":"Dar Al Taafi Clinic Center for Medical Services","District":"Eastern Province","Address 1":"King Khaled St.","Branch":"Rastanura District","Address 3":"P.O. Box 880","City":"Ras Tanura","Telephone No":{" 1":"136671378"}}
        ,
        {"Healthcare Provider Name":"Dar Al Tadawi Medical Complex","District":"Northen Province","Address 1":"Almustarah Dist. - Ring East-","Branch":"Above the tunnel of Prince Abdul Majeed","Address 3":"P.O.Box. 7902","City":"Madina","Telephone No":{" 1":"148318498"}}
        ,
        {"Healthcare Provider Name":"Dar As Sihha Dispensary","District":"Eastern Province","Address 1":"King Abdul Aziz Street,","Branch":"Near International Markets","Address 3":"PO Box 35267","City":"Dammam","Telephone No":{" 1":"138177899"}}
        ,
        {"Healthcare Provider Name":"Dar El Hekma Medical Complex","District":"Central Province","Address 1":"Al-Saliehia Area","Branch":"P.O. Box 5007","Address 3":"11422","City":"Riyadh","Telephone No":{" 1":"14787070"}}
        ,
        {"Healthcare Provider Name":"Dar Ram Derma & Dental Care","District":"Eastern Province","Address 1":"Al Aqrabiyah Dist.","Branch":"Prince Faisal Bin Fahad St.","Address 3":"P.O.Box 77003","City":"Khobar","Telephone No":{" 1":"138571296"}}
        ,
        {"Healthcare Provider Name":"Dar Teb Aseer Medical Complex","District":"Southren Province","Address 1":"Wahb Bin Misrah St.","Branch":"Al Minsik Dist.","Address 3":"P.O.Box. 3692","City":"Abha","Telephone No":{" 1":"172312333"}}
        ,
        {"Healthcare Provider Name":"Dawaa Al Salama Polyclinic","District":"Southren Province","Address 1":"Al Khaldiya Dis","Branch":"King Abdulaziz Street","Address 3":"P.O Box 1674","City":"Najran","Telephone No":{" 1":"175221080"}}
        ,
        {"Healthcare Provider Name":"Dawaak Medical Center Co.","District":"Central Province","Address 1":"Al Fayhaa District","Branch":"Haroon Al Rasheed Street","Address 3":"PO Box 63690 Riyadh 11526","City":"Riyadh","Telephone No":{" 1":"112446677"}}
        ,
        {"Healthcare Provider Name":"Dawna Medical Center","District":"Central Province","Address 1":"Al Buraidah District","Branch":"King Abdul Aziz Road","Address 3":"P.O.Box 19","City":"Al Badaya'a","Telephone No":{" 1":"163326660"}}
        ,
        {"Healthcare Provider Name":"Dawny Medical Polyclinic","District":"Southren Province","Address 1":"Al Nameis District","Branch":"King Fahad Road","Address 3":"PO Box. 61476 Abha 25515","City":"Abha","Telephone No":{" 1":"172280505"}}
        ,
        {"Healthcare Provider Name":"Demas Medical Clinics & Dialysis Center","District":"Central Province","Address 1":"Al Rabea Dist","Branch":"King Abdulaziz Road","Address 3":"PO BOX 42801","City":"Riyadh","Telephone No":{" 1":"920023008"}}
        ,
        {"Healthcare Provider Name":"Dent Clinic 4","District":"Central Province","Address 1":"Riyadh,across Almoghayrah bin shoba road","Branch":"Almoghayrah bin shoba road","Address 3":"King Fahed Dist","City":"Riyadh","Telephone No":{" 1":"920008311"}}
        ,
        {"Healthcare Provider Name":"Dentalia Clinics","District":"Western Province","Address 1":"Arrawdah Dist","Branch":"Prince Mohammed Bin Abdul Aziz St","Address 3":"P.O.Box 3732","City":"Jeddah","Telephone No":{" 1":"122840444"}}
        ,
        {"Healthcare Provider Name":"Dentcare","District":"Central Province","Address 1":"PO Box 39776","Branch":"Riyadh 11467","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Dento Plast Centers - Najran","District":"Southren Province","Address 1":"Al Zobat District","Branch":"King Faisal Street","Address 3":"PO Box 1615","City":"Najran","Telephone No":{" 1":"175232222"}}
        ,
        {"Healthcare Provider Name":"Dhaka Medical Center","District":"Central Province","Address 1":"Al Fotah Dst","Branch":"Hebatallah Al kazraji St","Address 3":"P.O.Box 37811 Riyadh 11449","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"DHUBA National Polyclinic","District":"Northen Province","Address 1":"P.O. Box 44","Branch":"71911","Address 3":"","City":"Duba","Telephone No":{" 1":"144320250"}}
        ,
        {"Healthcare Provider Name":"DIMA Dental Center","District":"Central Province","Address 1":"Tahlia Street, Olaya","Branch":"P.O Box 214, Riyadh - 11351","Address 3":"","City":"Riyadh","Telephone No":{" 1":"114661200"}}
        ,
        {"Healthcare Provider Name":"Dima Dental Center (2)","District":"Central Province","Address 1":"Al Olaya Dist.","Branch":"Al Tahlya St., Across l Takhasosy","Address 3":"P.O.Box. 214","City":"Riyadh","Telephone No":{" 1":"114615217"}}
        ,
        {"Healthcare Provider Name":"Dina Medical Complex","District":"Eastern Province","Address 1":"Prince Naif Street","Branch":"PO Box 99, Jubail 31951","Address 3":"","City":"Jubail","Telephone No":{" 1":"133611993"}}
        ,
        {"Healthcare Provider Name":"Domain Dental Center","District":"Eastern Province","Address 1":"Al Aqrabiyah Dist.","Branch":"Khadem Al Haramain Al Sharifain Road","Address 3":"PO Box 30173","City":"Khobar","Telephone No":{" 1":"138979922"}}
        ,
        {"Healthcare Provider Name":"Donia Al Noor Optical","District":"Central Province","Address 1":"Olaya Dist","Branch":"Prince Sultan Bin Abdulaziz St","Address 3":"PO BOX 154714","City":"Riyadh","Telephone No":{" 1":"112177008"}}
        ,
        {"Healthcare Provider Name":"Dorrat Al Elaj Polyclinic","District":"Central Province","Address 1":"Al Shifa District","Branch":"Al Mothanna Bin Hartha Street","Address 3":"PO BOX 295036","City":"Riyadh","Telephone No":{" 1":"114217399"}}
        ,
        {"Healthcare Provider Name":"Dorrat Ghornata Clinic","District":"Central Province","Address 1":"Ghornata District","Branch":"Khaled Ibn Alwleed Street","Address 3":"PO Box. 10150 Riyadh 11665","City":"Riyadh","Telephone No":{" 1":"112771162"}}
        ,
        {"Healthcare Provider Name":"Douvin Medical Center","District":"Central Province","Address 1":"Al Shomaisy District","Branch":"Al Emam Faisal Bin Turki Street","Address 3":"PO Box 221333","City":"Riyadh","Telephone No":{" 1":"14034366"}}
        ,
        {"Healthcare Provider Name":"Dr Abdul Aziz Al Ajaji Dental Polyclinic","District":"Central Province","Address 1":"Ali ibn Abi Taleb Street","Branch":"Al Malaz Area","Address 3":"PO Box 3154","City":"Riyadh","Telephone No":{" 1":"114774700"}}
        ,
        {"Healthcare Provider Name":"Dr Abdul Rahman Al Mishari Hospital ( Riyadh )","District":"Central Province","Address 1":"P.O. Box 56926","Branch":"11564","Address 3":"Olaya Area","City":"Riyadh","Telephone No":{" 1":"114657700"}}
        ,
        {"Healthcare Provider Name":"Dr Abdulfatah Al Mutlaq Polyclinic","District":"Central Province","Address 1":"PO Box 245794","Branch":"","Address 3":"","City":"Riyadh","Telephone No":{" 1":"114059787"}}
        ,
        {"Healthcare Provider Name":"Dr Ahmed Batal Eye Center","District":"Western Province","Address 1":"Al Hamra District","Branch":"Al Madina Road","Address 3":"","City":"Jeddah","Telephone No":{" 1":"920006659"}}
        ,
        {"Healthcare Provider Name":"Dr Al Qannas Dental Clinics","District":"Central Province","Address 1":"Al Aqiq Dist.","Branch":"Al Atlal St.","Address 3":"P.O.Box 88196","City":"Riyadh","Telephone No":{" 1":"114899224"}}
        ,
        {"Healthcare Provider Name":"Dr Al Saggaf Eye Clinic & Day Surgery","District":"Western Province","Address 1":"Al Faiha Dist.","Branch":"Abdullah Al Sulaiman St. Al Faiha Dist.","Address 3":"PO Box 21418","City":"Jeddah","Telephone No":{" 1":"126314004"}}
        ,
        {"Healthcare Provider Name":"Dr Ali Medical Complex","District":"Southren Province","Address 1":"The Main Road - Al Darb","Branch":"P.O Box - 35, Al Darb - 45142","Address 3":"","City":"Al Darb","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Dr Ameen Softah Medical Center","District":"Western Province","Address 1":"Al Naeem Disttrict","Branch":"Ahmed Bin Aseeb St. beside Hera shop","Address 3":"P.O.Box. 12630","City":"Jeddah","Telephone No":{" 1":"126073766"}}
        ,
        {"Healthcare Provider Name":"Dr Azallal Medical Center - Al Badiaa","District":"Central Province","Address 1":"Al Badiaa Dist","Branch":"Madian Monawarah St","Address 3":"PO BOX 75701","City":"Riyadh","Telephone No":{" 1":"114367777"}}
        ,
        {"Healthcare Provider Name":"Dr Bader Medical Center","District":"Northen Province","Address 1":"Al Rohmaneye District","Branch":"Al Takhasosi","Address 3":"PO Box 494","City":"Qrayat","Telephone No":{" 1":"146432333"}}
        ,
        {"Healthcare Provider Name":"Dr Bakhsh Hospital","District":"Western Province","Address 1":"Sharafia Area, Sitteen Street","Branch":"P.O. Box 6940","Address 3":"21452","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Dr Bassam Medical Center Co.","District":"Central Province","Address 1":"Al Morabaa Dist.","Branch":"Imam Abdullah Bin Faisal St.","Address 3":"P.O.Box 11444","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Dr Erfan & Bagedo General Hospital","District":"Western Province","Address 1":"Faisalia Area, Sitteen Street","Branch":"P.O. Box 6519","Address 3":"21452","City":"Jeddah","Telephone No":{" 1":"126038888"}}
        ,
        {"Healthcare Provider Name":"Dr Ghasana Sadiq Medical Complex","District":"Eastern Province","Address 1":"Al Tbeishi Dist.","Branch":"Prince Mohammed Bin Fahad St.","Address 3":"P.O.Box 6745","City":"Dammam","Telephone No":{" 1":"138280466"}}
        ,
        {"Healthcare Provider Name":"Dr Ghassan N Pharaon General Hospital","District":"Western Province","Address 1":"Prince Sultan St., Al Zahra District","Branch":"P.O. Box 4553","Address 3":"21412","City":"Jeddah","Telephone No":{" 1":"126823200"}}
        ,
        {"Healthcare Provider Name":"Dr Hamid S Al Ahmadi Hospital","District":"Northen Province","Address 1":"PO Box 6476","Branch":"Second Circle X Road","Address 3":"With Syed Al Shouhda","City":"Madina","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Dr Hassan Al Bar Hospital","District":"Southren Province","Address 1":"Johan Dis .","Branch":"King Fahd St .","Address 3":"P.O. Box. 3501","City":"Abha","Telephone No":{" 1":"172282222"}}
        ,
        {"Healthcare Provider Name":"Dr Hassan Al Naamy Specialized Hospital","District":"Eastern Province","Address 1":"Al Badyah Dist.","Branch":"Othman bin Afan St.","Address 3":"P.O.Box 9480","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Dr Hassan Ghazzawi Hospital","District":"Western Province","Address 1":"Siteen St, behind Bin Dawood Market","Branch":"PO Box 2387","Address 3":"Jeddah 21451","City":"Jeddah","Telephone No":{" 1":"126636333"}}
        ,
        {"Healthcare Provider Name":"Dr Jamil Khatab Polyclinic (Hofuf)","District":"Eastern Province","Address 1":"PO Box 1417","Branch":"Al Faisaliyah Area - Near SAKIKO","Address 3":"","City":"Al Hasa","Telephone No":{" 1":"135850999"}}
        ,
        {"Healthcare Provider Name":"Dr Khalid Idriss Hospital","District":"Western Province","Address 1":"Al Ammariyah District, King Khalid Stree","Branch":"P.O. Box 75","Address 3":"21411","City":"Jeddah","Telephone No":{" 1":"126423555"}}
        ,
        {"Healthcare Provider Name":"Dr Khalid Idriss Medical Center","District":"Western Province","Address 1":"Main Street","Branch":"P O Box 75","Address 3":"Rabigh 21411","City":"Rabigh","Telephone No":{" 1":"124222229"}}
        ,
        {"Healthcare Provider Name":"Dr Layla Al Onaizi Polyclinic","District":"Eastern Province","Address 1":"Al Raka District, Prince Sultan Road","Branch":"PO Box 30221","Address 3":"31952, Khobar","City":"Khobar","Telephone No":{" 1":"138574040"}}
        ,
        {"Healthcare Provider Name":"Dr Maha Al Haj Dental Clinic","District":"Central Province","Address 1":"Olaya Dist,","Branch":"Prince Sultam Bin Abdulaziz Street","Address 3":"PO BOX 17805","City":"Riyadh","Telephone No":{" 1":"112191922"}}
        ,
        {"Healthcare Provider Name":"Dr Marzouq Al Qannas Dental Center - Najran","District":"Southren Province","Address 1":"Al Diyafah Dist","Branch":"Al Jaish st","Address 3":"Box 728","City":"Najran","Telephone No":{" 1":"175228899"}}
        ,
        {"Healthcare Provider Name":"Dr Mohammad Ahmed Adawi Medical Complex","District":"Central Province","Address 1":"Othman Bin Affan Road","Branch":"Al Safraa Dist.","Address 3":"P.O.Box 8445","City":"Bureidah","Telephone No":{" 1":"163820330"}}
        ,
        {"Healthcare Provider Name":"Dr Munir Harasani Dental Clinic","District":"Western Province","Address 1":"Al Rawdah Dist.","Branch":"Prince Sultan St.","Address 3":"P.O.Box 7371","City":"Jeddah","Telephone No":{" 1":"920012355"}}
        ,
        {"Healthcare Provider Name":"Dr Noor Mohammed Khan Hospital","District":"Eastern Province","Address 1":"Al Aqariya Dis, Riyadh Road","Branch":"P.O. Box 80","Address 3":"31991","City":"Hafr Al Batin","Telephone No":{" 1":"137225550"}}
        ,
        {"Healthcare Provider Name":"Dr Noor Mohd Khan Clinic","District":"Eastern Province","Address 1":"PO Box 80","Branch":"31991","Address 3":"","City":"Hafr Al Batin","Telephone No":{" 1":"137220701"}}
        ,
        {"Healthcare Provider Name":"Dr Rami Hassanine Clinics","District":"Western Province","Address 1":"Al Safa District","Branch":"Al Falak Sqaure- Al Millibari Center","Address 3":"PO Box: 127099","City":"Jeddah","Telephone No":{" 1":"012 678 1541"}}
        ,
        {"Healthcare Provider Name":"Dr Saeed Medical Complex","District":"Western Province","Address 1":"Al Naseem Dist","Branch":"Al Naseem St","Address 3":"Po Box 88322","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Dr Samir Abbas Hospital","District":"Western Province","Address 1":"Al Shatee Dis.","Branch":"Al Korneesh St.","Address 3":"B.O.Box","City":"Jeddah","Telephone No":{" 1":"126530000"}}
        ,
        {"Healthcare Provider Name":"Dr Samir Abbas Hospital","District":"Western Province","Address 1":"Al Shatee Dis.","Branch":"Al Korneesh St.","Address 3":"B.O.Box","City":"Jeddah","Telephone No":{" 1":"126530000"}}
        ,
        {"Healthcare Provider Name":"Dr Sari Al Qahtani Polyclinic","District":"Western Province","Address 1":"Al Smiry, Ali Bin Abe Taleb Stree","Branch":"PO Box 485 - Yanbu 41911","Address 3":"","City":"Yanbu","Telephone No":{" 1":"143220077"}}
        ,
        {"Healthcare Provider Name":"Dr Sayyad Medical Center","District":"Western Province","Address 1":"Al Rawda District","Branch":"Al Tahleyah Street","Address 3":"","City":"Jeddah","Telephone No":{" 1":"0126677099 101"}}
        ,
        {"Healthcare Provider Name":"Dr Soliman Al Kharashi Medical Center","District":"Central Province","Address 1":"Al Nuzha Dist. Abo Baker Road","Branch":"Abo Baker Road","Address 3":"P.O.Box. 12607","City":"Riyadh","Telephone No":{" 1":"112222822"}}
        ,
        {"Healthcare Provider Name":"Dr Soliman Fakeeh Family Medical Center - Nuzha","District":"Western Province","Address 1":"Al Madina Street (N) Al Nozha Disctrict","Branch":"PO Box 2369, Jeddah - 23334","Address 3":"","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Dr Soliman Fakeeh Family Medicine Center - Al Basateen","District":"Western Province","Address 1":"5332 Ismail Ibn Kathir","Branch":"Al Basatin Dis.","Address 3":"Jeddah 23717-7103","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Dr Soliman Fakeeh Hospital","District":"Western Province","Address 1":"Falasteen St.","Branch":"P.O. Box 2537","Address 3":"21461","City":"Jeddah","Telephone No":{" 1":"126655000"}}
        ,
        {"Healthcare Provider Name":"Dr Taher Al Bahrani Specialist Polyclinic","District":"Eastern Province","Address 1":"Al Faisaliah Dist.","Branch":"Al Faisaliah St.","Address 3":"P.O.Box 80008","City":"Al Hasa","Telephone No":{" 1":"135853242"}}
        ,
        {"Healthcare Provider Name":"Dr Talal Kutub Medical Center","District":"Western Province","Address 1":"Al Safa District","Branch":"Prince Matab Street","Address 3":"P.O Box - 109952 Jeddah 21351","City":"Jeddah","Telephone No":{" 1":"126939222"}}
        ,
        {"Healthcare Provider Name":"Dr Zahir Qadeeb Al Ban Specialist Clinic - 1","District":"Western Province","Address 1":"Al Rasaifah District","Branch":"PO Box 5356","Address 3":"","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Dr Zahir Qadeeb Al Ban Specialist Clinics - 2 (Aziziah)","District":"Western Province","Address 1":"Al Azizia District","Branch":"Abdullah Bin Hameed Street","Address 3":"PO Box 5356 Makkah","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Durar Afif Dental Complex - 3","District":"Central Province","Address 1":"King Abdul Aziz Road","Branch":"P O Box - 54223","Address 3":"","City":"Afif","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Durar Al Jamsh Dental Clinic","District":"Central Province","Address 1":"Near by Al Jamsh Securiy","Branch":"","Address 3":"","City":"Rafai Al Jamsh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Durar Medical Polyclinic","District":"Central Province","Address 1":"Al Dawadmi","Branch":"Al Dawadmi General Road","Address 3":"P.O.Box. 702","City":"Al Dawadmy","Telephone No":{" 1":"116421515"}}
        ,
        {"Healthcare Provider Name":"Durat Al Ayn Optics","District":"Eastern Province","Address 1":"Al Nakheel Dist,","Branch":"King Saoud St","Address 3":"Box,64431","City":"Dammam","Telephone No":{" 1":"138302822"}}
        ,
        {"Healthcare Provider Name":"Durrat Lamar Medical Center","District":"Central Province","Address 1":"Al Azizyah Dist","Branch":"Shabab Street","Address 3":"PO BOX 282123","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Ebtesamat Al Nojom Clinics","District":"Western Province","Address 1":"5247","Branch":"Falsteen street, Near Al Hamra - Sofetel","Address 3":"","City":"Jeddah","Telephone No":{" 1":"126606000"}}
        ,
        {"Healthcare Provider Name":"Ebtesamat Al Nojoom Medical Center","District":"Western Province","Address 1":"Al Nayeem District","Branch":"Prince Sultan Street","Address 3":"PO Box 4587 Jeddah 21412","City":"Jeddah","Telephone No":{" 1":"126554232"}}
        ,
        {"Healthcare Provider Name":"Ebtsamatac Dental and Dermatology Center complex(","District":"Central Province","Address 1":"Al Naseem Dist","Branch":"Osama Bin Zyad","Address 3":"PO BOX 121478","City":"Riyadh","Telephone No":{" 1":"112329905"}}
        ,
        {"Healthcare Provider Name":"Eed Clinic","District":"Western Province","Address 1":"Al Faysaliyah District, Prince Fahad Str","Branch":"PO Box 11544 Jeddah 21463","Address 3":"","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Elaj Alriyadh Medical Center","District":"Central Province","Address 1":"Qurtobah Dist.","Branch":"Al Hassan Bin Al Hussain Road","Address 3":"PO BOX 10832","City":"Riyadh","Telephone No":{" 1":"114553041"}}
        ,
        {"Healthcare Provider Name":"Elia Clinic","District":"Southren Province","Address 1":"Al Qabeel Dst - Al Haseen St","Branch":"P.O.Box 1237 Najran 55461","Address 3":"","City":"Najran","Telephone No":{" 1":"175436000"}}
        ,
        {"Healthcare Provider Name":"Elite Clinic","District":"Eastern Province","Address 1":"Prince Turki Street ,Korneesh Area","Branch":"Box 4321,","Address 3":"34423","City":"Khobar","Telephone No":{" 1":"138940004"}}
        ,
        {"Healthcare Provider Name":"Elite Hospital","District":"Central Province","Address 1":"Olaya St.","Branch":"P.O. Box 68333","Address 3":"11528","City":"Riyadh","Telephone No":{" 1":"114616777"}}
        ,
        {"Healthcare Provider Name":"Enayati Al Shamel Medical Center","District":"Southren Province","Address 1":"Prince Meshael Dist","Branch":"Hamza Bin AbdulMuttalib Road","Address 3":"","City":"Najran","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Excellence Medical Center","District":"Eastern Province","Address 1":"Al-Quds St.","Branch":"P.O. Box 678","Address 3":"31911","City":"Qatif","Telephone No":{" 1":"138512800"}}
        ,
        {"Healthcare Provider Name":"Exeer Pharmacy","District":"Eastern Province","Address 1":"El Ferdos Dist","Branch":"King Abdul Aziz St","Address 3":"P.O.Box 9278","City":"Sayhat","Telephone No":{" 1":"138378331"}}
        ,
        {"Healthcare Provider Name":"Exir Medical Complex","District":"Central Province","Address 1":"Batha'a District, Batha'a Street","Branch":"PO Box 33506 Riyadh 11341","Address 3":"","City":"Riyadh","Telephone No":{" 1":"114067001"}}
        ,
        {"Healthcare Provider Name":"Experts Medical Specialist Center- Mahail","District":"Southren Province","Address 1":"Al Dirs Dist","Branch":"Abha Road, Next to Civil Affairs","Address 3":"PO BOX 773","City":"Muhayel","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Eye 2 Eye Optical","District":"Western Province","Address 1":"Al Nahda District, Hera`a Street","Branch":"PO Box 23523, Jeddah, 3032","Address 3":"","City":"Jeddah","Telephone No":{" 1":"920022293"}}
        ,
        {"Healthcare Provider Name":"Eye Art","District":"Western Province","Address 1":"Al Rawda District, Abi Hafsah Street","Branch":"PO Box 23434 Jeddah, 4698","Address 3":"","City":"Jeddah","Telephone No":{" 1":"126221663"}}
        ,
        {"Healthcare Provider Name":"Factories Medical Care Polyclinic","District":"Central Province","Address 1":"Riyadh","Branch":"201 Street .","Address 3":"P.O.Box. 3577","City":"Riyadh","Telephone No":{" 1":"112122200"}}
        ,
        {"Healthcare Provider Name":"Factories Polyclinic","District":"Central Province","Address 1":"Old Al Kharj Road, Industrial Area","Branch":"PO Box 5691","Address 3":"Riyadh 11432","City":"Riyadh","Telephone No":{" 1":"112652130"}}
        ,
        {"Healthcare Provider Name":"Fadad Specialist Clinic For Dentistry","District":"Central Province","Address 1":"Tawoon Area","Branch":"Imam Saud Bin Abdulaziz St.","Address 3":"PO BOX 101192","City":"Riyadh","Telephone No":{" 1":"112253440"}}
        ,
        {"Healthcare Provider Name":"Fahad Abdullah Al Ajaji Medical - Al Bukayriyah","District":"Central Province","Address 1":"King Khalid Road, Ar Rawdah","Branch":"Al Bukayriyah - 51941","Address 3":"","City":"Al Bukairiah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Fahad Abdullah Al Ajaji Medical - Al Fayziah","District":"Central Province","Address 1":"Prince Sultan Ibn Abdulaziz Road","Branch":"Prince Sultan Ibn Abdulaziz Road","Address 3":"","City":"Bureidah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Fahad Abdullah Al Ajaji Medical - Al Mawtaa","District":"Central Province","Address 1":"Al Ujaybah, Buraydah - 52355","Branch":"","Address 3":"","City":"Bureidah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Fahad Abdullah Al Ajaji Medical - Al Rayan","District":"Central Province","Address 1":"Ar Rayan Road, Ar Rayan","Branch":"Buraydah - 52378","Address 3":"","City":"Bureidah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Fahad Dentistry Clinics Complex","District":"Central Province","Address 1":"Etiaqa District, Al Hijaz Road","Branch":"PO Box 5142","Address 3":"11422","City":"Riyadh","Telephone No":{" 1":"114597123"}}
        ,
        {"Healthcare Provider Name":"Fahd Al Ajaji Clinics","District":"Central Province","Address 1":"Al Safra Dist","Branch":"Abu Baker Al Sedeeq","Address 3":"Box,1489","City":"Bureidah","Telephone No":{" 1":"163819050"}}
        ,
        {"Healthcare Provider Name":"Fahd Dental Center (2)","District":"Central Province","Address 1":"Olaya District, King Fahd Road","Branch":"PO Box 5142","Address 3":"11422","City":"Riyadh","Telephone No":{" 1":"114612424"}}
        ,
        {"Healthcare Provider Name":"Fajar Al Dammam Medical Complex","District":"Eastern Province","Address 1":"Plan 75, King Khaled Abdulaziz Street","Branch":"PO Box 10440 Dammam 31433","Address 3":"","City":"Dammam","Telephone No":{" 1":"138431525"}}
        ,
        {"Healthcare Provider Name":"Fakeeh Vision","District":"Western Province","Address 1":"Al Andalus Distrct","Branch":"Building No 9166, Ashur Streed,","Address 3":"Jeddah","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Family Care Hospital","District":"Central Province","Address 1":"Al Nadwa Dist.","Branch":"Al Raya St.","Address 3":"P.O.Box. 104164","City":"Riyadh","Telephone No":{" 1":"920024111"}}
        ,
        {"Healthcare Provider Name":"Family Dental Polyclinic","District":"Eastern Province","Address 1":"Al Mubarraz","Branch":"Mahasen Dist","Address 3":"Box,10191","City":"Al Hasa","Telephone No":{" 1":"135920277"}}
        ,
        {"Healthcare Provider Name":"Family Health Polyclinic","District":"Southren Province","Address 1":"Al Samer District, Main Street","Branch":"PO Box 2854 Abha 61461","Address 3":"","City":"Abha","Telephone No":{" 1":"172241199"}}
        ,
        {"Healthcare Provider Name":"Family Service Polyclinic","District":"Central Province","Address 1":"Al Mashtal Dist.","Branch":"Al Hizm St.","Address 3":"POBox 3822","City":"Riyadh","Telephone No":{" 1":"112716188"}}
        ,
        {"Healthcare Provider Name":"Family Smile Polyclinic","District":"Central Province","Address 1":"Al Maseef Dist","Branch":"King Abdulaziz Road","Address 3":"PO BOX 14454","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Faraidy National Poyclinic","District":"Central Province","Address 1":"Al Naseem Al Shargi","Branch":"Al Hafouf ST","Address 3":"P.O.Box 844 Riyadh 11421","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Fares Al Jazeera Polyclinic","District":"Central Province","Address 1":"Dahyaht Laban","Branch":"Najran Street","Address 3":"PO BOX 16387","City":"Riyadh","Telephone No":{" 1":"112476500"}}
        ,
        {"Healthcare Provider Name":"Farhan Mohammed Al Nader Clinic","District":"Central Province","Address 1":"Al Dawaer district- Al Tobad Street","Branch":"Al Aflaj","Address 3":"","City":"Al Aflaj","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Farza Optics","District":"Southren Province","Address 1":"Abha, Lebanon District","Branch":"PO Box 5 Abha 61411","Address 3":"","City":"Abha","Telephone No":{" 1":"172342222"}}
        ,
        {"Healthcare Provider Name":"Future Clinics","District":"Central Province","Address 1":"Al Fakhriya District","Branch":"Omar Bin Abdul Aziz Road","Address 3":"Bureidah","City":"Bureidah","Telephone No":{" 1":"163259900"}}
        ,
        {"Healthcare Provider Name":"Future Medical Center","District":"Central Province","Address 1":"Al Waha District","Branch":"Prince Abdullah Bin Abdulaziz Road","Address 3":"PO Box. 65579 Riyadh 11566","City":"Riyadh","Telephone No":{" 1":"12803105"}}
        ,
        {"Healthcare Provider Name":"Future Medical Specialized Company Group","District":"Central Province","Address 1":"Daheyat lbn Dist","Branch":"Al Tiaf Street","Address 3":"P.O Box75109","City":"Riyadh","Telephone No":{" 1":"112155551"}}
        ,
        {"Healthcare Provider Name":"Futurelab Medical Laboratories","District":"Western Province","Address 1":"Al Zahra Dis.","Branch":"Al Batarji St.","Address 3":"P.O.Box 1495","City":"Jeddah","Telephone No":{" 1":"126602525"}}
        ,
        {"Healthcare Provider Name":"Gadag Medical Care Center","District":"Central Province","Address 1":"Al Nahda Distrct, Salman Al Farsi Street","Branch":"P.O. Box - 92968","Address 3":"Riyadh - 11663","City":"Riyadh","Telephone No":{" 1":"112263800"}}
        ,
        {"Healthcare Provider Name":"GAMA Hospital","District":"Eastern Province","Address 1":"Dammam Road","Branch":"P.O. Box 4664","Address 3":"31952","City":"Khobar","Telephone No":{" 1":"138590024"}}
        ,
        {"Healthcare Provider Name":"General Care Dispensary","District":"Eastern Province","Address 1":"Al Badia District","Branch":"Othman Bin Afan St","Address 3":"P.O. Box 9480","City":"Dammam","Telephone No":{" 1":"138467777"}}
        ,
        {"Healthcare Provider Name":"Ghassana Sadiq Polyclinic","District":"Eastern Province","Address 1":"Khobar","Branch":"Bayoneeah District","Address 3":"Abdullah street","City":"Khobar","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"GNP Clinic - Al Baha","District":"Western Province","Address 1":"Aqiq Road","Branch":"P.O. Box 693","Address 3":"","City":"Al Baha","Telephone No":{" 1":"177271126"}}
        ,
        {"Healthcare Provider Name":"GNP Clinic - Jizan","District":"Southren Province","Address 1":"Al Safa Dist, near old court","Branch":"P.O. Box 111","Address 3":"","City":"Gizan","Telephone No":{" 1":"173175010"}}
        ,
        {"Healthcare Provider Name":"GNP Clinic - Makkah","District":"Western Province","Address 1":"Al Nuzha St.","Branch":"P.O. Box 8532","Address 3":"","City":"Makkah","Telephone No":{" 1":"125450758"}}
        ,
        {"Healthcare Provider Name":"GNP Clinic - Riyadh","District":"Central Province","Address 1":"Takhassusi Road","Branch":"After King Faisal Hospital, Syahya Mall","Address 3":"P.O. Box 88076","City":"Riyadh","Telephone No":{" 1":"114403536"}}
        ,
        {"Healthcare Provider Name":"GNP Clinic - Taif","District":"Western Province","Address 1":"Shobra St.","Branch":"P.O. Box 2201","Address 3":"","City":"Taif","Telephone No":{" 1":"127327055"}}
        ,
        {"Healthcare Provider Name":"GNP Clinic - Yanbu","District":"Western Province","Address 1":"Yanbu Industrial City","Branch":"P.O. Box 30017","Address 3":"","City":"Yanbu","Telephone No":{" 1":"143923222"}}
        ,
        {"Healthcare Provider Name":"GNP Hospital - Khamis Mushayt","District":"Southren Province","Address 1":"King Fahad Road","Branch":"Abha-Khamis Mushayt","Address 3":"P.O. Box 761","City":"Khamis Mushyat","Telephone No":{" 1":"172200002"}}
        ,
        {"Healthcare Provider Name":"Green Crescent Hospital","District":"Central Province","Address 1":"Al Mutamarat District","Branch":"Abdulmalik Ibn Marwan Street, Unit No. 1","Address 3":"P.O. Box 3096","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Green Crescent Hospital","District":"Central Province","Address 1":"Al Mutamarat District","Branch":"Abdulmalik Ibn Marwan Street, Unit No. 1","Address 3":"P.O. Box 3096","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Gulf Asian Medical Center","District":"Eastern Province","Address 1":"Al Safa Dist","Branch":"King Fahed Street","Address 3":"PO BOX 794","City":"Jubail","Telephone No":{" 1":"133627121"}}
        ,
        {"Healthcare Provider Name":"Gulf Family Medical Complex","District":"Central Province","Address 1":"PO Box 212","Branch":"King Faisal Street","Address 3":"Tabrjal","City":"Jouf","Telephone No":{" 1":"146288880"}}
        ,
        {"Healthcare Provider Name":"Hagar Dispensary - Hofuf","District":"Eastern Province","Address 1":"University Street, Al Matar District","Branch":"P.O. Box 4030","Address 3":"31982","City":"Hofuf","Telephone No":{" 1":"135804677"}}
        ,
        {"Healthcare Provider Name":"Hai Al Jamea Hospital","District":"Western Province","Address 1":"Al Sirah Al-Aterah St. Al Jamea Road","Branch":"P.O. Box 10153","Address 3":"21433","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Hail National Company For Health Care (SGH - Hail)","District":"Central Province","Address 1":"Al Khozami district","Branch":"King abdulaziz St.","Address 3":"P.O.Box. 12217","City":"Hail","Telephone No":{" 1":"165411111"}}
        ,
        {"Healthcare Provider Name":"Hakeem Oyoun Optics Group","District":"Central Province","Address 1":"King Abdulaziz Road","Branch":"Platinum building for travel and tourism","Address 3":"1st Floor","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Halah Essa Bin Laden Hospital","District":"Western Province","Address 1":"Al Hamra Dist. Ibrahim Adham Street","Branch":"Ibrahim Adham Street","Address 3":"P O Box 21472","City":"Jeddah","Telephone No":{" 1":"126603332"}}
        ,
        {"Healthcare Provider Name":"Halah Essa Bin Laden Polyclinic","District":"Western Province","Address 1":"Macarona St, Mushrifa District","Branch":"PO Box 24226","Address 3":"Jeddah 21446","City":"Jeddah","Telephone No":{" 1":"126722315"}}
        ,
        {"Healthcare Provider Name":"Hamed Specialized Polyclinic","District":"Southren Province","Address 1":"Aldars Dist, Before Girls College","Branch":"PO Box 171","Address 3":"`","City":"Muhayel","Telephone No":{" 1":"172858444"}}
        ,
        {"Healthcare Provider Name":"Hatten Medical Clinic","District":"Central Province","Address 1":"Prince Mohammed Ibn Saad","Branch":"Al Aqiq District","Address 3":"PO BOX 56882","City":"Riyadh","Telephone No":{" 1":"114855111"}}
        ,
        {"Healthcare Provider Name":"Hayat Al Khamis Medical Complex","District":"Southren Province","Address 1":"Al Rasras Dist","Branch":"Saad Bin Abi Waqas","Address 3":"PO BOX 32","City":"Khamis Mushyat","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Hayat National Hospital - Qassim","District":"Central Province","Address 1":"PO Box 3300","Branch":"51911","Address 3":"Al Madinah Road","City":"Onaizah","Telephone No":{" 1":"163636600"}}
        ,
        {"Healthcare Provider Name":"Hayaty Clinic","District":"Eastern Province","Address 1":"Bahrya St.","Branch":"Al Sifih Dist.","Address 3":"P.O.Box. 9912","City":"Al Hasa","Telephone No":{" 1":"135850500"}}
        ,
        {"Healthcare Provider Name":"Health and Life Dispensary","District":"Eastern Province","Address 1":"King Fahad Airport Road","Branch":"PO Box 13661","Address 3":"Dammam 31414","City":"Dammam","Telephone No":{" 1":"138222222"}}
        ,
        {"Healthcare Provider Name":"Health and Safety Medical Complex","District":"Eastern Province","Address 1":"Al aziziya Dist","Branch":"Prince Jalawi Bin Abdulaziz","Address 3":"Po Box 610","City":"Al Nuairyah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Health Care Polyclinic","District":"Eastern Province","Address 1":"Al Adama Dist","Branch":"Mahale St","Address 3":"Po Box 14241","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Health Medical Clinic","District":"Eastern Province","Address 1":"Al Raka Dist.","Branch":"Khalid Bin Alwaleed St.","Address 3":"P.O.Box. 77046","City":"Khobar","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Heraa Medical Center","District":"Central Province","Address 1":"PO Box 30925","Branch":"11487","Address 3":"","City":"Riyadh","Telephone No":{" 1":"114390040"}}
        ,
        {"Healthcare Provider Name":"Hiba Asia Polyclinic","District":"Western Province","Address 1":"Al Rawabi District","Branch":"Old Makkah Road","Address 3":"PO Box 16558","City":"Jeddah","Telephone No":{" 1":"126232020"}}
        ,
        {"Healthcare Provider Name":"Hiba Asia Polyclinic 2","District":"Western Province","Address 1":"Bab Makkah","Branch":"Dar Al Mansour Street","Address 3":"PO Box 71987","City":"Jeddah","Telephone No":{" 1":"126451777"}}
        ,
        {"Healthcare Provider Name":"High Care Polyclinic","District":"Central Province","Address 1":"Bahjah Dist.","Branch":"Al Jarif St.","Address 3":"P.O.Box 304","City":"Al Russ","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"How Medical Centers Group - Al Morouj","District":"Central Province","Address 1":"Al Morouj Dist,","Branch":"Ibn Sina Street","Address 3":"PO BOX 22693","City":"Riyadh","Telephone No":{" 1":"114509444"}}
        ,
        {"Healthcare Provider Name":"How Medical Centers Group - Al Naseem","District":"Central Province","Address 1":"Al Naseem Dist,","Branch":"Saad Bin Abi Waqas St.","Address 3":"PO BOX 45887","City":"Riyadh","Telephone No":{" 1":"12356111"}}
        ,
        {"Healthcare Provider Name":"Hussam Optics","District":"Western Province","Address 1":"Behind Bin Dawood Supermarket","Branch":"Near Hassan Ghazzawi Hospital ,","Address 3":"Al Rawdah District, Jeddah Int'l","City":"Jeddah","Telephone No":{" 1":"126658665"}}
        ,
        {"Healthcare Provider Name":"Hussein Al Ali Hospital","District":"Eastern Province","Address 1":"Al Faysaliah Dist,King Fahed St.","Branch":"Box.2322","Address 3":"Hofouf.31982","City":"Al Hasa","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Hussein Al Ali Polyclinic","District":"Eastern Province","Address 1":"King Faisal District,","Branch":"P.O Box 2981","Address 3":"Al Hasa 31982","City":"Al Hasa","Telephone No":{" 1":"135878796"}}
        ,
        {"Healthcare Provider Name":"Hyatt Medical Laboratory","District":"Eastern Province","Address 1":"Dammam - Al Faisalyah Dis","Branch":"Abu Backer Siddiq St","Address 3":"Al Manar unit No 03","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Ibn Hayan Opticals","District":"Northen Province","Address 1":"Al Sulimanyah Dist","Branch":"King Fahad Road","Address 3":"PO BOX 1403","City":"Tabuk","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Ibn Sina College Hospital","District":"Western Province","Address 1":"Al Shifa Dist","Branch":"Al Mahjar Street","Address 3":"P O BOX 31906","City":"Jeddah","Telephone No":{" 1":"126355566"}}
        ,
        {"Healthcare Provider Name":"Ibn Sina Polyclinic - Makkah","District":"Western Province","Address 1":"Northern Aziziah Dist.","Branch":"Aziziah General St.","Address 3":"PO Box 1576","City":"Makkah","Telephone No":{" 1":"125586515"}}
        ,
        {"Healthcare Provider Name":"IDCC - International Diabetes Care Center (Selah Company)","District":"Western Province","Address 1":"Al Muhamadiah Dist.","Branch":"Prince Sultan St.","Address 3":"P.O.Box 11743","City":"Jeddah","Telephone No":{" 1":"920004478"}}
        ,
        {"Healthcare Provider Name":"IDCC - International Diabetes Care Center (Selah Company)","District":"Western Province","Address 1":"Al Muhamadiah Dist.","Branch":"Prince Sultan St.","Address 3":"P.O.Box 11743","City":"Jeddah","Telephone No":{" 1":"920004478"}}
        ,
        {"Healthcare Provider Name":"Imam Abdurahman Al Faisal (NGHA) - Dammam","District":"Eastern Province","Address 1":"Al Thahran","Branch":"King Saud Road","Address 3":"","City":"Dammam","Telephone No":{" 1":"138580037"}}
        ,
        {"Healthcare Provider Name":"Integrated Treatment Center PT - Men","District":"Central Province","Address 1":"P.O. Box - 42523, Riyadh","Branch":"","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Intermed Clinic","District":"Western Province","Address 1":"P O Box - 50790, Jeddah - 21533","Branch":"Cornich St, Alshate'e Dist, Alnukhba Bld","Address 3":"","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"International Medical Complex - Najran","District":"Southren Province","Address 1":"Al Shorfah Dis.","Branch":"Prince Sultan St.","Address 3":"P.O.Box 1045","City":"Najran","Telephone No":{" 1":"175468440"}}
        ,
        {"Healthcare Provider Name":"Islam Medical Clinic","District":"Western Province","Address 1":"Al Jamea District","Branch":"Al Imam Laith Street","Address 3":"PO Box 18120","City":"Jeddah","Telephone No":{" 1":"126871077"}}
        ,
        {"Healthcare Provider Name":"Jamal Al Ayoun Optics","District":"Western Province","Address 1":"Al Naeem Dist","Branch":"Heraa Street","Address 3":"P.O Box 118601","City":"Jeddah","Telephone No":{" 1":"126586952"}}
        ,
        {"Healthcare Provider Name":"Jarir Medical Center","District":"Central Province","Address 1":"Al Malaz Dist","Branch":"Jarir Street","Address 3":"PO BOX 64096","City":"Riyadh","Telephone No":{" 1":"114777471"}}
        ,
        {"Healthcare Provider Name":"Jeddah Clinic Hospital ( Al Kandarah )","District":"Western Province","Address 1":"Al Kandarah Dist.","Branch":"Old Airport Road","Address 3":"P.O. Box 115","City":"Jeddah","Telephone No":{" 1":"126313131"}}
        ,
        {"Healthcare Provider Name":"Jeddah Ideal Center For Optics","District":"Western Province","Address 1":"Al Azizyah Dist","Branch":"Macarona Street","Address 3":"PO BOX 8564","City":"Jeddah","Telephone No":{" 1":"126748794"}}
        ,
        {"Healthcare Provider Name":"Jeddah National Hospital","District":"Western Province","Address 1":"P.O. Box 8564","Branch":"21492","Address 3":"145 Macrona Street","City":"Jeddah","Telephone No":{" 1":"126710040"}}
        ,
        {"Healthcare Provider Name":"Jordanian Medical Clinics","District":"Eastern Province","Address 1":"Dammam - King Saoud St .","Branch":"Ohoud Dst","Address 3":"P.O.Box 83238 Dammam 31538","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Jubail Medicare Complex","District":"Eastern Province","Address 1":"Al Mansour Road","Branch":"P.O. Box 287","Address 3":"Jubail 31951","City":"Jubail","Telephone No":{" 1":"133631888"}}
        ,
        {"Healthcare Provider Name":"Jubail National Dispensary","District":"Eastern Province","Address 1":"Prince Sultan street","Branch":"P.O. Box 260","Address 3":"31951","City":"Jubail","Telephone No":{" 1":"133620385"}}
        ,
        {"Healthcare Provider Name":"Jwel Clinics - Riyadh","District":"Central Province","Address 1":".","Branch":"","Address 3":"","City":"Riyadh","Telephone No":{" 1":"14883424"}}
        ,
        {"Healthcare Provider Name":"Kadoon Dental Center 1","District":"Central Province","Address 1":"Al Malaz Dist,","Branch":"Al Ahsa Street, infront of Pepsi factory","Address 3":"PO BOX 285072","City":"Riyadh","Telephone No":{" 1":"011-920009102"}}
        ,
        {"Healthcare Provider Name":"Kadoon Dental Center 2","District":"Central Province","Address 1":"Al Olaya Dist,","Branch":"Al Olaya Main St.","Address 3":"PO BOX 28072","City":"Riyadh","Telephone No":{" 1":"112168888"}}
        ,
        {"Healthcare Provider Name":"Kahhal Medical Complex","District":"Eastern Province","Address 1":"Al Hamra District","Branch":"Abo Horairah Dist.","Address 3":"PO Box 12393","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Kahhal Medical Complex - Al Ahsa","District":"Eastern Province","Address 1":"Al Yahya Dist.","Branch":"Al Dahran St.","Address 3":"P.O.Box 1441","City":"Al Hasa","Telephone No":{" 1":"130327777"}}
        ,
        {"Healthcare Provider Name":"Kahhal Optics Shop","District":"Eastern Province","Address 1":"Al Hamra Dist","Branch":"Al Kornaish St","Address 3":"Box 12393","City":"Dammam","Telephone No":{" 1":"138097777"}}
        ,
        {"Healthcare Provider Name":"Kawkabat Alsaha Medical Center-Taymaa","District":"Western Province","Address 1":"Al Rawdah District","Branch":"Al Ameer Abdulmajeed street","Address 3":"P.O BOX 106","City":"Taymaa","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Kental Dental Center (1)","District":"Central Province","Address 1":"Al Morabaa Dist","Branch":"Prince Abdulaziz Bin Musaeed Bin Jelewi","Address 3":"PO BOX 221333","City":"Riyadh","Telephone No":{" 1":"114080414"}}
        ,
        {"Healthcare Provider Name":"Khaled Bakr Al Bakri Polyclinic","District":"Western Province","Address 1":"Tahliah Street, Arbaeen Crossing","Branch":"Al Rihab District","Address 3":"P.O.Box 109930","City":"Jeddah","Telephone No":{" 1":"126754555"}}
        ,
        {"Healthcare Provider Name":"Khalid Medical Clinic","District":"Central Province","Address 1":"Abou Hourair St, Al-Nasseim Sharqy","Branch":"276022","Address 3":"11314","City":"Riyadh","Telephone No":{" 1":"12365000"}}
        ,
        {"Healthcare Provider Name":"Khalid Polyclinic 1","District":"Western Province","Address 1":"Kilo 8","Branch":"Makkah Highway","Address 3":"Al Rawaby Dist","City":"Jeddah","Telephone No":{" 1":"126203192"}}
        ,
        {"Healthcare Provider Name":"Khalid Polyclinic 2","District":"Western Province","Address 1":"Al Samer District, Al Haramain Rd","Branch":"PO Box 138430","Address 3":"Jeddah 21323","City":"Jeddah","Telephone No":{" 1":"122722222"}}
        ,
        {"Healthcare Provider Name":"Khanani Polyclinic","District":"Northen Province","Address 1":"Azizia District","Branch":"Faisal Bin Fahad Street","Address 3":"PO Box 285","City":"Arar","Telephone No":{" 1":"146627770"}}
        ,
        {"Healthcare Provider Name":"Khobaraa Alelaj Polyclinic","District":"Central Province","Address 1":"Om Al Hamam Dist.","Branch":"P.O. Box: 15448","Address 3":"Riyadh 1444","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Khonaini Medical Complex","District":"Eastern Province","Address 1":"Industrial Jubail, Al Dafi Dist.","Branch":"Al Khalil St.","Address 3":"POBox 10566","City":"Jubail","Telephone No":{" 1":"133495910"}}
        ,
        {"Healthcare Provider Name":"King AbdulAziz Hospital - Al Hasa","District":"Eastern Province","Address 1":"King Abdul Aziz Medical City","Branch":"","Address 3":"","City":"Al Hasa","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"King Fahad National Guard Hospital","District":"Central Province","Address 1":"PO BOX 22490, Riyadh 11426, KSA","Branch":"","Address 3":"","City":"Riyadh","Telephone No":{" 1":"112520088"}}
        ,
        {"Healthcare Provider Name":"King Khalid Hospital - National Guard","District":"Western Province","Address 1":"P.O. Box 9515","Branch":"21423","Address 3":"","City":"Jeddah","Telephone No":{" 1":"126240000"}}
        ,
        {"Healthcare Provider Name":"Kingdom Hospital","District":"Central Province","Address 1":"Al Thamamh Area","Branch":"P.O. Box 84400","Address 3":"11671","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Kingdom Medical Center","District":"Western Province","Address 1":"Al Fayha Dist.","Branch":"Om Al Momineen St.","Address 3":"P.O.Box. 54686 - 21955","City":"Makkah","Telephone No":{" 1":"125424444"}}
        ,
        {"Healthcare Provider Name":"Kingdom Medical Center","District":"Western Province","Address 1":"Al Fayha Dist.","Branch":"Om Al Momineen St.","Address 3":"P.O.Box. 54686 - 21955","City":"Makkah","Telephone No":{" 1":"125424444"}}
        ,
        {"Healthcare Provider Name":"l Andalus Dental Center","District":"Central Province","Address 1":"Al Orayja Dist,","Branch":"Prince Musaed Bin Abdul Rahman St.","Address 3":"PO BOX 34985","City":"Riyadh","Telephone No":{" 1":"114301481"}}
        ,
        {"Healthcare Provider Name":"l Salam Hospital - Riyadh","District":"Central Province","Address 1":"Al Salam Dist.","Branch":"Imam Al Shafie St.","Address 3":"P.O.Box. 11512","City":"Riyadh","Telephone No":{" 1":"112946167"}}
        ,
        {"Healthcare Provider Name":"La Baas Polyclinic","District":"Central Province","Address 1":"Al Waset District","Branch":"King Khalid Street","Address 3":"","City":"Hail","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Lama Medical Complex","District":"Eastern Province","Address 1":"Al Faisaliah Dist","Branch":"Abu Baker Al Sedeeq St","Address 3":"Box 10440","City":"Dammam","Telephone No":{" 1":"138119578"}}
        ,
        {"Healthcare Provider Name":"Lamasaat Shifaa Medical Complex","District":"Northen Province","Address 1":"Al Elm Dist.","Branch":"Othman Bin Affan St.","Address 3":"P.O.Box 137","City":"Madina","Telephone No":{" 1":"148681899"}}
        ,
        {"Healthcare Provider Name":"Language & Listening Stimulation Center (LLSC)","District":"Western Province","Address 1":"Al Rowais Dist.","Branch":"Al Ma'adi St.","Address 3":"P.O.Box 9609","City":"Jeddah","Telephone No":{" 1":"126391055"}}
        ,
        {"Healthcare Provider Name":"Lasting Smile Dental Clinics","District":"Central Province","Address 1":"Al Olaya Dist,","Branch":"Abdulrahman Al Hamdan St,","Address 3":"PO BOX 8362","City":"Riyadh","Telephone No":{" 1":"114640216"}}
        ,
        {"Healthcare Provider Name":"Lavander Medical Clinic","District":"Central Province","Address 1":"King Faisal Dist.","Branch":"Prince Bander Bin Abdulaziz St.","Address 3":"P.O.Box. 25349","City":"Riyadh","Telephone No":{" 1":"112301666"}}
        ,
        {"Healthcare Provider Name":"Lolouat Al Aaj Dental Clinic","District":"Central Province","Address 1":"Tuwaik Dist.","Branch":"Bilal Bin Rabah St.","Address 3":"P.O.Box 436235","City":"Riyadh","Telephone No":{" 1":"112477301"}}
        ,
        {"Healthcare Provider Name":"Lotus Medical Center","District":"Central Province","Address 1":"Riyadh, Yarmouk District,","Branch":"Imam Mohammed Bin Saoud Road","Address 3":"PO Box 86211, Riyadh 11622","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Mabasem Polyclinic","District":"Northen Province","Address 1":"Al Sulimanya District,","Branch":"Prince Mamdoh Street","Address 3":"PO Box 2216","City":"Tabuk","Telephone No":{" 1":"144228840"}}
        ,
        {"Healthcare Provider Name":"Madaar Al Shefa Dental Polyclinic - KM","District":"Southren Province","Address 1":"Anoud Dist","Branch":"King Fahed Road","Address 3":"PO BOX 294","City":"Khamis Mushyat","Telephone No":{" 1":"127403333"}}
        ,
        {"Healthcare Provider Name":"Madaar Al Shefa Dental Polyclinic - Makkah","District":"Western Province","Address 1":"Al Azizyah Dist","Branch":"Main Street, Al Rajhi Center","Address 3":"PO BOX 65345","City":"Makkah","Telephone No":{" 1":"127403333"}}
        ,
        {"Healthcare Provider Name":"Madina Medical Center","District":"Northen Province","Address 1":"Al Fatih Dist.","Branch":"Sultana St.","Address 3":"P.O.Box. 749","City":"Madina","Telephone No":{" 1":"920002077"}}
        ,
        {"Healthcare Provider Name":"Madina Medical Center 2","District":"Northen Province","Address 1":"Bni Hartha Dis.","Branch":"Abu Zar Al Ghaffari","Address 3":"P.O.Box 3986","City":"Madina","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Madina National Hospital","District":"Northen Province","Address 1":"Green Hizam St,","Branch":"P.O. Box 1972","Address 3":"","City":"Madina","Telephone No":{" 1":"148444444"}}
        ,
        {"Healthcare Provider Name":"Mafasel Clinics","District":"Western Province","Address 1":"Cornich Road, Elite Square,Al Shati Dist","Branch":"P.O BOX 3542","Address 3":"Jeddah 23412","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Magic Smile Dental Center","District":"Eastern Province","Address 1":"Al Jazira Dist.","Branch":"Al Quds St.","Address 3":"POBox 73","City":"Qatif","Telephone No":{" 1":"138510055"}}
        ,
        {"Healthcare Provider Name":"Magrabi Dental Center - Al Morjan","District":"Western Province","Address 1":"Al Morjan Dist","Branch":"Jablah Bin Amro Al Ansari Street","Address 3":"P.O Box 20377","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Magrabi Dental Center - Madinah","District":"Northen Province","Address 1":".","Branch":"","Address 3":"","City":"Madina","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Magrabi Eye & Dental Center - Al Badea","District":"Central Province","Address 1":"Al Badea Dist","Branch":"Aisha Bint Abu Taleb Street","Address 3":"PO Box 42255","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Magrabi Eye & Dental Center - Al Badea","District":"Central Province","Address 1":"Al Badea Dist","Branch":"Aisha Bint Abu Taleb Street","Address 3":"PO Box 42255","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Magrabi Eye & Ear Center - Dammam","District":"Eastern Province","Address 1":"Plan 71","Branch":"P.O. Box 1840","Address 3":"Dammam","City":"Dammam","Telephone No":{" 1":"138180000"}}
        ,
        {"Healthcare Provider Name":"Magrabi Eye & Ear Center - Khozam","District":"Western Province","Address 1":"Khozam St. Kilo 3","Branch":"P.O. Box 7344","Address 3":"21462","City":"Jeddah","Telephone No":{" 1":"126365000"}}
        ,
        {"Healthcare Provider Name":"Magrabi Eye & Ear Center - Madina Munawara","District":"Northen Province","Address 1":"Air Port Road","Branch":"Madian","Address 3":"PO BOX 655","City":"Madina","Telephone No":{" 1":"148422211"}}
        ,
        {"Healthcare Provider Name":"Magrabi Eye and Dental Center - Qassim","District":"Central Province","Address 1":".","Branch":"","Address 3":"","City":"Bureidah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Magrabi Eye and Dental Specialized Polyclinics- Ghernata","District":"Central Province","Address 1":"Al Shada'a Dist","Branch":"Prince Saud bin Abdulaziz Road","Address 3":"Po box 42254","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Magrabi Eye and Dental Specialized Polyclinics- Ghernata","District":"Central Province","Address 1":"Al Shada'a Dist","Branch":"Prince Saud bin Abdulaziz Road","Address 3":"Po box 42254","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Magrabi Eye Center - Al Ahsaa","District":"Eastern Province","Address 1":"Al Hasa","Branch":"P.O Box 1840","Address 3":"Dammam","City":"Al Hasa","Telephone No":{" 1":"135858888"}}
        ,
        {"Healthcare Provider Name":"Magrabi Eye Center - North Jeddah - Salama Center","District":"Western Province","Address 1":"Salama Medical Center - Tower (3)","Branch":"First Floor","Address 3":"Prince Sultan Street","City":"Jeddah","Telephone No":{" 1":"126165500"}}
        ,
        {"Healthcare Provider Name":"Magrabi Eye Ear & Dental Center - Al Kharj","District":"Central Province","Address 1":"King Abdullah Street, Al Kharj","Branch":"Ghornata Dist","Address 3":"","City":"Al Kharj","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Magrabi Eye Ear & Dental Center - Al Khobar","District":"Eastern Province","Address 1":"Al Kornish Dist","Branch":"Prince Turki Next to Maridian","Address 3":"PO BOX 2642","City":"Khobar","Telephone No":{" 1":"138817777"}}
        ,
        {"Healthcare Provider Name":"Magrabi Eye Ear & Dental Center - Jazan","District":"Southren Province","Address 1":"PO Box 516","Branch":"","Address 3":"","City":"Gizan","Telephone No":{" 1":"173225555"}}
        ,
        {"Healthcare Provider Name":"Magrabi Eye Ear & Dental Center - Riyadh","District":"Central Province","Address 1":"Al Rabwah Dist exit 14","Branch":"P.O. Box 42254","Address 3":"11541","City":"Riyadh","Telephone No":{" 1":"14455049"}}
        ,
        {"Healthcare Provider Name":"Magrabi Eye Ear & Dental Hospital - Aseer","District":"Southren Province","Address 1":"Abha- Khamis - King Fahad Road Asser","Branch":"P.O. Box 516","Address 3":"","City":"Khamis Mushyat","Telephone No":{" 1":"172355555"}}
        ,
        {"Healthcare Provider Name":"Magrabi Hospital - Riyadh","District":"Central Province","Address 1":"Al mohamadiah Dist","Branch":"King Fahed Road","Address 3":"Box 230870","City":"Riyadh","Telephone No":{" 1":"14705656"}}
        ,
        {"Healthcare Provider Name":"Magrabi Optical","District":"Western Province","Address 1":"Madinah Road, Magrabi Medical Services","Branch":"Al Mushrifa Dist.","Address 3":"P.O. Box 7540","City":"Jeddah","Telephone No":{" 1":"126067261"}}
        ,
        {"Healthcare Provider Name":"Maha Medical Complex","District":"Southren Province","Address 1":"Al Wasat Dis","Branch":"The Main Road","Address 3":"PO Box 1081","City":"Gizan","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Maidan Medical Clinics Center - Nuairiyah","District":"Eastern Province","Address 1":"Nuairiyah","Branch":"Abo Hadriyah St.","Address 3":"P.O. Box. 3067","City":"Dammam","Telephone No":{" 1":"133730665"}}
        ,
        {"Healthcare Provider Name":"Majestic Millennium 2M","District":"Central Province","Address 1":"Al Wrood Dst - Mousaeed Al Anqari ST","Branch":"P.O.Box 1205 Riyadh 11323","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Majid Medical Complex","District":"Eastern Province","Address 1":"Jubail King Faisal Western Road -","Branch":"Mecca Street Intersection","Address 3":"","City":"Jubail","Telephone No":{" 1":"133625767"}}
        ,
        {"Healthcare Provider Name":"Majid Naji Optics","District":"Western Province","Address 1":"Al Hadaieq Dist - Yanbu Al Bahr","Branch":"Abu Baker Al Sedeeq St","Address 3":"Infront of Khair Bilady Souq","City":"Yanbu","Telephone No":{" 1":"143919696"}}
        ,
        {"Healthcare Provider Name":"Majid Naji Optics 2","District":"Western Province","Address 1":"Al Sharbatly Dist.","Branch":"Omar Bin Abdulaziz St.","Address 3":"P.O.Box. 46424","City":"Yanbu","Telephone No":{" 1":"143913934"}}
        ,
        {"Healthcare Provider Name":"Majid Naji Optics 3","District":"Western Province","Address 1":"Ali Bin Abi Talib St.","Branch":"Yanbu Mall Center, Al Zohoor Dist","Address 3":"P.O.Box. 46424","City":"Yanbu","Telephone No":{" 1":"143913934"}}
        ,
        {"Healthcare Provider Name":"Makkah Clinic","District":"Central Province","Address 1":"Al Wezarat district","Branch":"P.O. Box 63384","Address 3":"11516","City":"Riyadh","Telephone No":{" 1":"114765548"}}
        ,
        {"Healthcare Provider Name":"Makkah Medical Center","District":"Western Province","Address 1":"Al Madinah Road Al Naeem Dist","Branch":"Al Naeem Dist","Address 3":"P.O. Box 10644","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Makkah Polyclinic - Al Zaher","District":"Western Province","Address 1":"Al Zaher District","Branch":"Makkah 6570 - 24222","Address 3":"","City":"Makkah","Telephone No":{" 1":"125496542"}}
        ,
        {"Healthcare Provider Name":"Malaz Medical Co. Polyclinic","District":"Central Province","Address 1":"Masa'ab Bin Omair St.","Branch":"P.O. Box 5691","Address 3":"11432","City":"Riyadh","Telephone No":{" 1":"114771515"}}
        ,
        {"Healthcare Provider Name":"Mamlakat Al Tib Dental Complex","District":"Eastern Province","Address 1":"Al Mahlath Dist","Branch":"Makkah Street","Address 3":"PO BOX 899","City":"Khafji","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Manar Al Sihha Dispensary","District":"Eastern Province","Address 1":"Zahran Street - Airport Dist .","Branch":"P.O.Box 142","Address 3":"Abqiq 31992","City":"Abqiq","Telephone No":{" 1":"135660163"}}
        ,
        {"Healthcare Provider Name":"Manarat Al Moroj Polyclinic","District":"Northen Province","Address 1":"Al Moroj Dist,","Branch":"Al Moroj St.","Address 3":"PO BOX 55","City":"Tabuk","Telephone No":{" 1":"144293363"}}
        ,
        {"Healthcare Provider Name":"Manarat Polyclinic","District":"Western Province","Address 1":"Al Aziziah Dist.","Branch":"Price Meteb St.","Address 3":"PO Box 132244","City":"Jeddah","Telephone No":{" 1":"122870607"}}
        ,
        {"Healthcare Provider Name":"Maroom Medical Center","District":"Eastern Province","Address 1":"Al Baladia Dist.","Branch":"King Abdulaziz road","Address 3":"P.O.Box 4905","City":"Hafr Al Batin","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Mas Al Oyoun Optics (Al Aziziyah)","District":"Central Province","Address 1":"Al Aziziyah Dist.","Branch":"Al Shabab St.","Address 3":"P.O.Box. 27090","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Mayara General Medical Complex","District":"Western Province","Address 1":"Mayyara General Medical Complex","Branch":"Al Baha District -King saud road","Address 3":"PO Box 65526","City":"Al Baha","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Mayo Dental Center Complex","District":"Eastern Province","Address 1":"Al Shamalyah Dis","Branch":"king Faisal Al Shamali St","Address 3":"B.O.Box 10053 Jubail 31961","City":"Jubail","Telephone No":{" 1":"133611399"}}
        ,
        {"Healthcare Provider Name":"Medical Center of Dawa Al Janoub","District":"Southren Province","Address 1":"Al Jorbah Dist.","Branch":"Prince Sultan Bin Abdullaziz Street","Address 3":"PO Box 201","City":"Najran","Telephone No":{" 1":"175422075"}}
        ,
        {"Healthcare Provider Name":"Medical Reference Clinics","District":"Western Province","Address 1":"Al ShateDist, Zomorrodat Al Shate Ceter","Branch":"King Abdulaziz St, north hera cross","Address 3":"PO BOX 126132","City":"Jeddah","Telephone No":{" 1":"920001476"}}
        ,
        {"Healthcare Provider Name":"Medical Refill","District":"Western Province","Address 1":".","Branch":"","Address 3":"","City":"Jeddah","Telephone No":{" 1":"920033059"}}
        ,
        {"Healthcare Provider Name":"Medical World Complex","District":"Central Province","Address 1":"Jarir Street","Branch":"Malaz District","Address 3":"","City":"Riyadh","Telephone No":{" 1":"114731313"}}
        ,
        {"Healthcare Provider Name":"Menshaf Optical","District":"Central Province","Address 1":"Rodha 2 Dist.","Branch":"Hassan Bin Ali St.","Address 3":"PO Box 270218","City":"Riyadh","Telephone No":{" 1":"0112374321-111"}}
        ,
        {"Healthcare Provider Name":"Meraas Four Medical Company","District":"Central Province","Address 1":"Al Badiah Dist","Branch":"Al Daeri Al Garbi","Address 3":"PO BOX 420","City":"Riyadh","Telephone No":{" 1":"112754941"}}
        ,
        {"Healthcare Provider Name":"Mirad Medical Clinic","District":"Central Province","Address 1":"Al Naseem Dist","Branch":"Abu Hurairah St.","Address 3":"PO BOX 5203","City":"Riyadh","Telephone No":{" 1":"114595913"}}
        ,
        {"Healthcare Provider Name":"Mishal Medical Polyclinic","District":"Southren Province","Address 1":"Al Wasat Dist","Branch":"Internal Rotary, Beside National Bank","Address 3":"PO BOX 453","City":"Sabya","Telephone No":{" 1":"173266611"}}
        ,
        {"Healthcare Provider Name":"Modern Dental Center - Jubail","District":"Eastern Province","Address 1":"King Faisal Road, Al Jawhara Dist.","Branch":"Al Jubail 35514","Address 3":"","City":"Jubail","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Modern Dental Centre (Dammam)","District":"Eastern Province","Address 1":"King AbdulAziz St, opp. of Silver Tawer","Branch":"P.O. Box 7468","Address 3":"31462","City":"Dammam","Telephone No":{" 1":"138412210"}}
        ,
        {"Healthcare Provider Name":"Modern Dental Medical Complex (Al Khobar)","District":"Eastern Province","Address 1":"King Fahad Road, opposite of Al Mo'jel G","Branch":"P.O. Box 7468","Address 3":"31462","City":"Khobar","Telephone No":{" 1":"138671828"}}
        ,
        {"Healthcare Provider Name":"Modern Medical Center","District":"Western Province","Address 1":"Al Kakeya District","Branch":"Ibrahim Al Khalil Street","Address 3":"PO Box 5755 Makkah","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Modern Medical Complex","District":"Central Province","Address 1":"Rabwah","Branch":"P.O. Box 50768","Address 3":"11533","City":"Riyadh","Telephone No":{" 1":"14918003"}}
        ,
        {"Healthcare Provider Name":"Mohammad Dossary Hospital","District":"Eastern Province","Address 1":"Al Thahran St,","Branch":"P.O. Box 3354","Address 3":"31952","City":"Khobar","Telephone No":{" 1":"138945524"}}
        ,
        {"Healthcare Provider Name":"Mohammed Fakhry & Dr Ahmed Naser Abdulmohsin Alqarzaie Hospital","District":"Eastern Province","Address 1":"1st and 2nd St crossing, Prince Bander S","Branch":"P.O. Box 251","Address 3":"31952","City":"Khobar","Telephone No":{" 1":"138641960"}}
        ,
        {"Healthcare Provider Name":"Mohammed Hakami Medical Complex","District":"Southren Province","Address 1":"King Fahad Road","Branch":"P.O. Box 35","Address 3":"Jazan","City":"Gizan","Telephone No":{" 1":"173233333"}}
        ,
        {"Healthcare Provider Name":"Mohammed S. Al- Khonaini Medical Services Complex","District":"Eastern Province","Address 1":"Al Waha District, Abu Ali Road","Branch":"Jubail City","Address 3":"P.O.Box- 892, Code - 31951, Saudi Arabia","City":"Jubail","Telephone No":{" 1":"133615737"}}
        ,
        {"Healthcare Provider Name":"Molecular Imaging Center ( I-ONE) ( Referral)","District":"Western Province","Address 1":"P O Box - 117187, Jeddah 21391","Branch":"","Address 3":"","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Mugla Optical Centers","District":"Central Province","Address 1":"Al Rawdah Dist","Branch":"Khalid Bin Al Waleed St,Al Sadhan Center","Address 3":"PO BOX 10481","City":"Riyadh","Telephone No":{" 1":"112222299"}}
        ,
        {"Healthcare Provider Name":"Muhammed S. Basharahil Hospital","District":"Western Province","Address 1":"Madinah Road","Branch":"Omaa Gadida","Address 3":"PO Box 10505","City":"Makkah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Muhayil National Hospital","District":"Southren Province","Address 1":"PO Box 176","Branch":"Muhayil 61913","Address 3":"","City":"Muhayel","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Mujtama Modern Pharmacy","District":"Western Province","Address 1":"Al Muhamadiah Dist.","Branch":"Infront of dar al mahbah school","Address 3":"P.O.Box. 109474","City":"Jeddah","Telephone No":{" 1":"126117393"}}
        ,
        {"Healthcare Provider Name":"Mujtama Modern Pharmacy","District":"Western Province","Address 1":"Al Muhamadiah Dist.","Branch":"Infront of dar al mahbah school","Address 3":"P.O.Box. 109474","City":"Jeddah","Telephone No":{" 1":"126117393"}}
        ,
        {"Healthcare Provider Name":"Munaa Turif Medical Complex","District":"Northen Province","Address 1":"AlKhlaleej District","Branch":"P.O Box 194","Address 3":"91411","City":"Turaif","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Murjan Medical Complex","District":"Eastern Province","Address 1":"Hajr Dist","Branch":"Prince Mohammed bin Fahad","Address 3":"PO Box 77070","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Mushrifa Medical Center","District":"Western Province","Address 1":"","Branch":"35 Macarona Street P.O. Box 18252","Address 3":"21415","City":"Jeddah","Telephone No":{" 1":"126736287"}}
        ,
        {"Healthcare Provider Name":"Mustasharak Medical Center - Jeddah","District":"Western Province","Address 1":"Al Safa Dist","Branch":"Al Shurbatly Street","Address 3":"PO BOX 23342","City":"Jeddah","Telephone No":{" 1":"122220000"}}
        ,
        {"Healthcare Provider Name":"My Care Medical Center","District":"Western Province","Address 1":"Al Azizyah District","Branch":"Al Moalfeen Street","Address 3":"PO Box 6902 Jeddah 21452","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"My Clinic","District":"Western Province","Address 1":"PO Box 260","Branch":"Jeddah 21411","Address 3":"","City":"Jeddah","Telephone No":{" 1":"920022811"}}
        ,
        {"Healthcare Provider Name":"My Family Medical Center","District":"Western Province","Address 1":"Al Ajaweed Dist.","Branch":"Main Road","Address 3":"P.O.Box. 34834","City":"Jeddah","Telephone No":{" 1":"122620055"}}
        ,
        {"Healthcare Provider Name":"My Teeth Clinic Complex- Al Muzahmiah","District":"Central Province","Address 1":"Garnatah Dist","Branch":"King Faisal Street","Address 3":"PO BOX 11972","City":"Riyadh","Telephone No":{" 1":"115232929"}}
        ,
        {"Healthcare Provider Name":"Nabd Al Afia Medical Complex","District":"Western Province","Address 1":"Al Aqiq - Jefn","Branch":"General Road","Address 3":"P.O.Box. 65691","City":"Al Aqiq","Telephone No":{" 1":"177290530"}}
        ,
        {"Healthcare Provider Name":"Nabdh Al Wateen Polyclinic - Al Zulfi","District":"Central Province","Address 1":"Dist 16","Branch":"Al Thalatheen Street","Address 3":"PO BOX 92","City":"Riyadh","Telephone No":{" 1":"164222777"}}
        ,
        {"Healthcare Provider Name":"Nahaj Al Shifa General Medical Company Group","District":"Eastern Province","Address 1":"Omm Al Sahek","Branch":"P.O.Box 90","Address 3":"31921","City":"Qatif","Telephone No":{" 1":"138467999"}}
        ,
        {"Healthcare Provider Name":"Nahdi/Daan/Sudais/Saudia Pharmacies","District":"Western Province","Address 1":"Al Rwaies,Al Farsi Bulding","Branch":"King Abdullah St","Address 3":"Box,17129","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Naseem Al Azhar Medical Complex","District":"Central Province","Address 1":"Al Jabbrah District","Branch":"King Faisal St.","Address 3":"B.O.Box 5797","City":"Riyadh","Telephone No":{" 1":"114115965"}}
        ,
        {"Healthcare Provider Name":"Naseem Jeddah Polyclinic","District":"Western Province","Address 1":"Azizia district, Alsahar Alwarrdi St.","Branch":"Near Al Manar shopping center","Address 3":"P.O.Box 104364","City":"Jeddah","Telephone No":{" 1":"122875540"}}
        ,
        {"Healthcare Provider Name":"National Blood & Cancer Center","District":"Central Province","Address 1":"Al Sulimanayah Dist","Branch":"Al Orobah Street","Address 3":"PO BOX 301672","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"National Clinic (Al Qrayat)","District":"Northen Province","Address 1":"P.O. Box 70","Branch":"","Address 3":"","City":"Qrayat","Telephone No":{" 1":"146421235"}}
        ,
        {"Healthcare Provider Name":"National General Medical Complex","District":"Central Province","Address 1":"Afnan Dist","Branch":"Afnan Street","Address 3":"PO BOX 393","City":"Hail","Telephone No":{" 1":"165320333"}}
        ,
        {"Healthcare Provider Name":"Nawajeth Dental Clinic","District":"Central Province","Address 1":"Olaya Dist,","Branch":"King Fahed Road","Address 3":"PO BOX 57075","City":"Riyadh","Telephone No":{" 1":"114656531"}}
        ,
        {"Healthcare Provider Name":"Nawajeth Dental Clinic","District":"Central Province","Address 1":"Olaya Dist,","Branch":"King Fahed Road","Address 3":"PO BOX 57075","City":"Riyadh","Telephone No":{" 1":"114656531"}}
        ,
        {"Healthcare Provider Name":"Nazer Arabia Pharmacy Co","District":"Western Province","Address 1":"PO Box 260","Branch":"Jeddah 21411","Address 3":"","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"New Al Hiba Polyclinic","District":"Western Province","Address 1":"Al Samer District","Branch":"Main Street","Address 3":"PO Box 136206 Jeddah 21313","City":"Jeddah","Telephone No":{" 1":"126500089"}}
        ,
        {"Healthcare Provider Name":"New Al Salama Polyclinic","District":"Western Province","Address 1":"P.O.Box 10153","Branch":"Phase 1 - Residential Area","Address 3":"Mahjar","City":"Jeddah","Telephone No":{" 1":"122682862"}}
        ,
        {"Healthcare Provider Name":"New Gulail Polyclinic","District":"Western Province","Address 1":"Hasan Hasnain Street","Branch":"Gulail","Address 3":"PO Box 104364","City":"Jeddah","Telephone No":{" 1":"126360346"}}
        ,
        {"Healthcare Provider Name":"New Zoom Optics","District":"Northen Province","Address 1":"Abu Baker Al Sideeq Street","Branch":"Al Dakhel Plaza No1","Address 3":"PO Box 40970 Madina 41511","City":"Madina","Telephone No":{" 1":"148550607"}}
        ,
        {"Healthcare Provider Name":"Nibras Al Seha Medical Center","District":"Western Province","Address 1":"Abdullah Sharbathaly Street, Al Safa","Branch":"","Address 3":"","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Noon Medical Center","District":"Central Province","Address 1":"Umm Al Hamam District","Branch":"Umm Al Hamam Street","Address 3":"PO BOX 1655","City":"Riyadh","Telephone No":{" 1":"114834022"}}
        ,
        {"Healthcare Provider Name":"Noor Madar Dental Clinic","District":"Eastern Province","Address 1":"Al Quds Street","Branch":"Al Majidiah District","Address 3":"PO Box 15075","City":"Qatif","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Noorana Medical Polyclinic","District":"Central Province","Address 1":"Al Malaz Dist,","Branch":"Salahuddin St(Opposite to General Admin)","Address 3":"PO BOX 25880","City":"Riyadh","Telephone No":{" 1":"114785006"}}
        ,
        {"Healthcare Provider Name":"Nukhbat Al Janoub Medical Complex","District":"Southren Province","Address 1":"Jazan - Besh","Branch":"Sea St. East of Besh Muniapality","Address 3":"","City":"Gizan","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Obeid Specialist Hospital - Riyadh","District":"Central Province","Address 1":"Farazdak Street; Malaz","Branch":"PO Box 3484","Address 3":"11471","City":"Riyadh","Telephone No":{" 1":"114767222"}}
        ,
        {"Healthcare Provider Name":"Obeid Specialized Hospital - Al Ahsa","District":"Eastern Province","Address 1":"Al Maneh District","Branch":"Dhahran Street","Address 3":"PO Box 11017","City":"Al Hasa","Telephone No":{" 1":"135303333"}}
        ,
        {"Healthcare Provider Name":"Olas Medical Center","District":"Western Province","Address 1":"Al Hamadaniah Dst - General St","Branch":"P.O.Box 138802 Jeddah 21323","Address 3":"","City":"Jeddah","Telephone No":{" 1":"122122222"}}
        ,
        {"Healthcare Provider Name":"Olaya International Polyclinic","District":"Central Province","Address 1":"Olaya Main Road","Branch":"PO Box 16110","Address 3":"11464","City":"Riyadh","Telephone No":{" 1":"112930135"}}
        ,
        {"Healthcare Provider Name":"Olaya Medical Center","District":"Central Province","Address 1":"Talateen St","Branch":"P.O. Box 220251","Address 3":"11311","City":"Riyadh","Telephone No":{" 1":"14645501"}}
        ,
        {"Healthcare Provider Name":"Olaya Polyclinic Center Complex","District":"Central Province","Address 1":"Olaya District","Branch":"Prince Sultan Street","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Omar Al Ajaji Medical Center - 2 Sanaiya","District":"Central Province","Address 1":"P.O. Box17912","Branch":"11494","Address 3":"","City":"Riyadh","Telephone No":{" 1":"12655525"}}
        ,
        {"Healthcare Provider Name":"Omar Al Ajaji Medical Complex","District":"Central Province","Address 1":"PO Box 17912","Branch":"11494","Address 3":"","City":"Riyadh","Telephone No":{" 1":"114741122"}}
        ,
        {"Healthcare Provider Name":"Omm Al-Hammam Polyclinic","District":"Central Province","Address 1":"P.O. Box 3484","Branch":"11471","Address 3":"","City":"Riyadh","Telephone No":{" 1":"114806348"}}
        ,
        {"Healthcare Provider Name":"Optical City 1","District":"Western Province","Address 1":"Shehar Dist","Branch":"Shehar Main Street","Address 3":"PO BOX 0","City":"Taif","Telephone No":{" 1":"127444433"}}
        ,
        {"Healthcare Provider Name":"Optical City 2","District":"Western Province","Address 1":"Shehar Dist","Branch":"Al Shefa Road","Address 3":"PO BOX","City":"Taif","Telephone No":{" 1":"127444433"}}
        ,
        {"Healthcare Provider Name":"Optical City 3","District":"Western Province","Address 1":"Nakhab Dist","Branch":"Khaled Bin Al Waleed Street","Address 3":"PO BOX 0","City":"Taif","Telephone No":{" 1":"127444433"}}
        ,
        {"Healthcare Provider Name":"Optical Corner","District":"Western Province","Address 1":"Al Shawkiyah Dist.","Branch":"Abdullah Bin Abbas St.","Address 3":"P.O.Box. 902","City":"Makkah","Telephone No":{" 1":"125352059"}}
        ,
        {"Healthcare Provider Name":"Osrat Al Majd Medical Complex","District":"Central Province","Address 1":"Hamza Bin Abdulmottaleb Street","Branch":"PO Box 22004","Address 3":"11495","City":"Riyadh","Telephone No":{" 1":"114182228"}}
        ,
        {"Healthcare Provider Name":"Oxy Health Medical Center","District":"Central Province","Address 1":"Abu Baker Assediq Road","Branch":"Al Wadi District - Riyadh - 13313 - 2317","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Oyoun Dhiba Optics","District":"Northen Province","Address 1":"Al Qerfaa District","Branch":"Main Street","Address 3":"PO Box 85","City":"Duba","Telephone No":{" 1":"144320405"}}
        ,
        {"Healthcare Provider Name":"Ozone Dental Clinic - Al Khobar","District":"Eastern Province","Address 1":"Prince Turkey Street","Branch":"PO Box 8682","Address 3":"Al Khobar 31412","City":"Khobar","Telephone No":{" 1":"138940007"}}
        ,
        {"Healthcare Provider Name":"Panorama Al Farabi Dental Center","District":"Central Province","Address 1":"Al Khaleej Dist","Branch":"prince Bandar bin abdulaziz","Address 3":"Po Box 34985","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Panorama Clinics","District":"Central Province","Address 1":"Al Akhdar Dis","Branch":"ALi Bin Abe Taleb road","Address 3":"","City":"Bureidah","Telephone No":{" 1":"163846777"}}
        ,
        {"Healthcare Provider Name":"Panorama Dental Center","District":"Eastern Province","Address 1":"Al Hamra Dist","Branch":"Arabian Gulf St,","Address 3":"Box,40100","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Pearls Smile Medical Center 2","District":"Central Province","Address 1":"Sulimanyah,Behind al Saqaf pharmacy","Branch":"Prince Mamdouh Bin Abdul Aziz St.","Address 3":"Box 295560","City":"Riyadh","Telephone No":{" 1":"114646334"}}
        ,
        {"Healthcare Provider Name":"Physical Therapists Center","District":"Central Province","Address 1":"Al Olaya dist","Branch":"Al Dabab St , billding (275)","Address 3":"Front of King Fahd Medical City- westren","City":"Riyadh","Telephone No":{" 1":"12930010"}}
        ,
        {"Healthcare Provider Name":"Pioneers Specialist Medical Center","District":"Central Province","Address 1":"Al Dar Al Bidaa ,Al Aziziyah Al Aamah","Branch":"cross Abdul Qader Al Jazari st","Address 3":"PO BOX 62635","City":"Riyadh","Telephone No":{" 1":"112130011"}}
        ,
        {"Healthcare Provider Name":"Pretty Smile Dental Clinic - Riyadh","District":"Central Province","Address 1":"Al Wadi District","Branch":"Abo Bakr Al Sideq Street","Address 3":"PO Box 52795 Riyadh 11573","City":"Riyadh","Telephone No":{" 1":"112243333"}}
        ,
        {"Healthcare Provider Name":"Primary Care Medical Complex 1","District":"Central Province","Address 1":"Al Mozahmeyah District","Branch":"Main Street","Address 3":"PO Box 6468 Riyadh 11442","City":"Riyadh","Telephone No":{" 1":"115232829"}}
        ,
        {"Healthcare Provider Name":"Primary Care Medical Complex 2","District":"Central Province","Address 1":"Dahyat Labn District","Branch":"PO Box 6468 Riyadh 11442","Address 3":"","City":"Riyadh","Telephone No":{" 1":"114367195"}}
        ,
        {"Healthcare Provider Name":"Primary Care Medical Complex 3","District":"Central Province","Address 1":"Sultana District","Branch":"PO Box 468 Riyadh 11442","Address 3":"","City":"Riyadh","Telephone No":{" 1":"14589504"}}
        ,
        {"Healthcare Provider Name":"Primary Care Medical Complex 4","District":"Central Province","Address 1":"Al Quwaiyah Al Zouhour Area","Branch":"PO Box 4","Address 3":"Al Quwaiyah 11971","City":"Riyadh","Telephone No":{" 1":"116521888"}}
        ,
        {"Healthcare Provider Name":"Prince Fahad Bin Sultan Hospital","District":"Northen Province","Address 1":"Al Sultanah Dis, Madina Road","Branch":"P.O. Box 1626","Address 3":"71441","City":"Tabuk","Telephone No":{" 1":"144280444"}}
        ,
        {"Healthcare Provider Name":"Prince Mohammed Bin Abdulaziz Hospital - Al Madina","District":"Northen Province","Address 1":"Madina","Branch":"","Address 3":"","City":"Madina","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Prince Sultan Humanitarian City","District":"Central Province","Address 1":"Exit number 6","Branch":"PO Box 64399","Address 3":"11536","City":"Riyadh","Telephone No":{" 1":"115620000"}}
        ,
        {"Healthcare Provider Name":"Prince Sultan Medical Complex","District":"Central Province","Address 1":"Prince Ahmed Bin Abdulaziz Road, Riyadh","Branch":"","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Prince Sultan Rehabilitation Center","District":"Eastern Province","Address 1":"Al Bustan Dist","Branch":"P.O Box 9119","Address 3":"31413","City":"Dammam","Telephone No":{" 1":"138681306"}}
        ,
        {"Healthcare Provider Name":"Pro Care Hospital","District":"Eastern Province","Address 1":"Olaya District, Plan 2/345","Branch":"PO Box 20425","Address 3":"31952 Khobar","City":"Khobar","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Pyramid Care Polyclinic","District":"Central Province","Address 1":"Ishbilya Dst - Sahaba St","Branch":"P.O.Box 37661","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Qamar Aloroba Medical Complex 1","District":"Central Province","Address 1":"Al Shifa District","Branch":"Al Termzi Street","Address 3":"PO Box 7867 Riyadh 11472","City":"Riyadh","Telephone No":{" 1":"114215709"}}
        ,
        {"Healthcare Provider Name":"Qasr Al-Rayed Complex Polyclinic","District":"Central Province","Address 1":"King Fahad District","Branch":"Prince Nayif Bin Abdulaziz Street","Address 3":"PO Box 844 Makka 11421","City":"Riyadh","Telephone No":{" 1":"12690606"}}
        ,
        {"Healthcare Provider Name":"Quality Dental Clinics","District":"Western Province","Address 1":"Al Nozha District","Branch":"Main Street","Address 3":"","City":"Makkah","Telephone No":{" 1":"920004864"}}
        ,
        {"Healthcare Provider Name":"Rabiah Hospital","District":"Central Province","Address 1":"PO Box 20077","Branch":"Riyadh 11455","Address 3":"","City":"Riyadh","Telephone No":{" 1":"114999000"}}
        ,
        {"Healthcare Provider Name":"Rafa Medical Center","District":"Eastern Province","Address 1":"Sabkha Dist,","Branch":"Dahran Street","Address 3":"Near Al Khobar Police Station","City":"Khobar","Telephone No":{" 1":"138974777"}}
        ,
        {"Healthcare Provider Name":"Rafha Medical Center","District":"Northen Province","Address 1":"Al Mohamadiah","Branch":"Omar bin Al Khatab St.","Address 3":"Box 567","City":"Rafha'a","Telephone No":{" 1":"146763880"}}
        ,
        {"Healthcare Provider Name":"Raheef Dental Center","District":"Central Province","Address 1":"Umm Al Hammam","Branch":"Beside Al Ameen Pharmacy","Address 3":"PO BOX 34012","City":"Riyadh","Telephone No":{" 1":"114822718"}}
        ,
        {"Healthcare Provider Name":"Rahima Medical Polyclinic","District":"Eastern Province","Address 1":"PO Box 161","Branch":"50 St,","Address 3":"","City":"Ras Tanura","Telephone No":{" 1":"136674490"}}
        ,
        {"Healthcare Provider Name":"Rai Al Ain Optical","District":"Northen Province","Address 1":"Al Daeeri Al Thani Dist","Branch":"Al Awali","Address 3":"PO BOX 6278","City":"Madina","Telephone No":{" 1":"148660548"}}
        ,
        {"Healthcare Provider Name":"Ram Dental and Derma Center","District":"Western Province","Address 1":"P O Box - 32074","Branch":"","Address 3":"","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Ram Dental Care","District":"Western Province","Address 1":"Khalid Bin Alwaleed St.","Branch":"Next to Bin Baz mosque","Address 3":"P.O.Box. 32244","City":"Yanbu","Telephone No":{" 1":"143931222"}}
        ,
        {"Healthcare Provider Name":"Ram Dental Center - Al Ahsa","District":"Eastern Province","Address 1":"Al Mubarraz District, Dhahran Street","Branch":"PO Box 22074 Ahsa 31592","Address 3":"","City":"Al Hasa","Telephone No":{" 1":"135313831"}}
        ,
        {"Healthcare Provider Name":"Ram Dental Center - Khobar 2","District":"Eastern Province","Address 1":"Al Khobar Al Shamaliyah","Branch":"Prince Faisal Bin Fahed St","Address 3":"PO BOX 32074","City":"Khobar","Telephone No":{" 1":"138675566"}}
        ,
        {"Healthcare Provider Name":"Ram Dental Center - Qatif","District":"Eastern Province","Address 1":"Al Majediyah Dist","Branch":"Al Quds Street","Address 3":"PO BOX 32074","City":"Qatif","Telephone No":{" 1":"138559004"}}
        ,
        {"Healthcare Provider Name":"Ram Dental Center (1) - Dammam","District":"Eastern Province","Address 1":"Al Hamra Dist","Branch":"Al Khaleej Road","Address 3":"PO BOX 15075","City":"Dammam","Telephone No":{" 1":"138356755"}}
        ,
        {"Healthcare Provider Name":"Ram Dental Center (2) - Dammam","District":"Eastern Province","Address 1":"Al Merekbat Dist.","Branch":"Othman Bin Afan ST.","Address 3":"Box . 32074 Dammam 31952","City":"Dammam","Telephone No":{" 1":"138425701"}}
        ,
        {"Healthcare Provider Name":"Ram Dental Clinic - Khobar","District":"Eastern Province","Address 1":"Al Aqrabeya District,","Branch":"Prince Homoud Bin Abdulaziz Street,/","Address 3":"P.O. Box 32074","City":"Khobar","Telephone No":{" 1":"138648181"}}
        ,
        {"Healthcare Provider Name":"Ram Medical Complex - Dammam 3","District":"Eastern Province","Address 1":"Al Buhairah Dist.","Branch":"Gulf Arabian St.","Address 3":"P.O.Box. 15075","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Ram Rahima Medical Complex","District":"Eastern Province","Address 1":"P O Box - 31921","Branch":"","Address 3":"","City":"Ras Tanura","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Rama Medical Group","District":"Central Province","Address 1":"Al Maazr District","Branch":"Al Takhasussi Street","Address 3":"PO Box 50174 Riyadh 11523","City":"Riyadh","Telephone No":{" 1":"114800933"}}
        ,
        {"Healthcare Provider Name":"Rashed Complex Medical Clinics","District":"Central Province","Address 1":"Al Namar Dist.","Branch":"Najm Al Deen Al Ayoubi Road beside Herfy","Address 3":"P.O.Box. 37094","City":"Riyadh","Telephone No":{" 1":"114102630"}}
        ,
        {"Healthcare Provider Name":"Rashed Complex Medical Clinics","District":"Central Province","Address 1":"Al Namar Dist.","Branch":"Najm Al Deen Al Ayoubi Road beside Herfy","Address 3":"P.O.Box. 37094","City":"Riyadh","Telephone No":{" 1":"114102630"}}
        ,
        {"Healthcare Provider Name":"Rawafed Medical Complex - Jazan","District":"Southren Province","Address 1":"Al Rawda District","Branch":"Prince Sultan St, Infront of STC,","Address 3":"P.O. Box 454","City":"Gizan","Telephone No":{" 1":"173173725"}}
        ,
        {"Healthcare Provider Name":"Rawdat Al Aqsa Polyclinic","District":"Central Province","Address 1":"Al Rawda District","Branch":"Al Hassan Bin Ali Street","Address 3":"PO Box 101402 Riyadh 11655","City":"Riyadh","Telephone No":{" 1":"114938919"}}
        ,
        {"Healthcare Provider Name":"Rawdat Al Aqsa Polyclinic 2","District":"Central Province","Address 1":"Al Nuzha District","Branch":"Othman Bin Affan Road","Address 3":"PO Box 87647","City":"Riyadh","Telephone No":{" 1":"114536060"}}
        ,
        {"Healthcare Provider Name":"Rayan Al Sharq Clinic - Hail","District":"Central Province","Address 1":"Al Montazahat Al Gharbi Dist,","Branch":"Jeddah St","Address 3":"Box, 921","City":"Hail","Telephone No":{" 1":"165388888"}}
        ,
        {"Healthcare Provider Name":"Red Sea Polyclinic","District":"Western Province","Address 1":"At the Beginning Of Yanbu Al Nakhl Road","Branch":"","Address 3":"","City":"Yanbu","Telephone No":{" 1":"143223413"}}
        ,
        {"Healthcare Provider Name":"Renad Optical - Al Badia","District":"Central Province","Address 1":"Al Badia District","Branch":"Al Madina Road","Address 3":"","City":"Riyadh","Telephone No":{" 1":"112066363"}}
        ,
        {"Healthcare Provider Name":"Renad Optical - Al Malaz","District":"Central Province","Address 1":"Al Malaz District","Branch":"Salah Al Deen Street","Address 3":"","City":"Riyadh","Telephone No":{" 1":"112066363"}}
        ,
        {"Healthcare Provider Name":"Renad Optical - Al Shefa","District":"Central Province","Address 1":"Al Shifa District","Branch":"Al Termithe Street","Address 3":"","City":"Riyadh","Telephone No":{" 1":"112066363"}}
        ,
        {"Healthcare Provider Name":"Riadah Polyclinic","District":"Western Province","Address 1":"Umm Al Qura Street","Branch":"Al Safa Dist.","Address 3":"P.O. Box: 132604","City":"Jeddah","Telephone No":{" 1":"122721111"}}
        ,
        {"Healthcare Provider Name":"Right Treatment Medical Center","District":"Central Province","Address 1":"Al Swaide District","Branch":"Main Swaide Street","Address 3":"PO Box 3154 Riyadh 11471","City":"Riyadh","Telephone No":{" 1":"114268000"}}
        ,
        {"Healthcare Provider Name":"Rimas Dental Clinics","District":"Western Province","Address 1":"Al Madina Road","Branch":"Al Rowais District","Address 3":"Mohamadiya Plaza, Floor 2","City":"Jeddah","Telephone No":{" 1":"126518104"}}
        ,
        {"Healthcare Provider Name":"River of Health Medical Center","District":"Central Province","Address 1":"Al Nadwah Dist.","Branch":"Al Harith Bin Abdullah St.","Address 3":"P.O.Box. 4634","City":"Riyadh","Telephone No":{" 1":"112692080"}}
        ,
        {"Healthcare Provider Name":"Riyadat Al Dhahran Medical Complex","District":"Eastern Province","Address 1":"ibn battutah st","Branch":"","Address 3":"Po box 60018","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Riyadh Care Hospital","District":"Central Province","Address 1":"Al Rayan Street","Branch":"P.O. Box 42142","Address 3":"11541","City":"Riyadh","Telephone No":{" 1":"114933000"}}
        ,
        {"Healthcare Provider Name":"Riyadh Medical Center Complex","District":"Central Province","Address 1":"Al-Urouba Street","Branch":"P.O. Box 50768","Address 3":"11533","City":"Riyadh","Telephone No":{" 1":"114653060"}}
        ,
        {"Healthcare Provider Name":"Riyadh National Hospital","District":"Central Province","Address 1":"Sitteen Street, Malaz Area","Branch":"P.O. Box 2715","Address 3":"11461","City":"Riyadh","Telephone No":{" 1":"114378351"}}
        ,
        {"Healthcare Provider Name":"Roaa Al Mustagbal","District":"Southren Province","Address 1":"Mansak, Main street","Branch":"Near to Sarat Obaidah General Hospital","Address 3":"P.O.Box 25200","City":"Sarat Obaidah","Telephone No":{" 1":"172318751"}}
        ,
        {"Healthcare Provider Name":"Roaa Al Mustaqbal Medical Complex","District":"Southren Province","Address 1":"Main Street","Branch":"In front of Al Namas Hospital","Address 3":"PO Box. 25200 Namas 61466","City":"Al Namas","Telephone No":{" 1":"172820222"}}
        ,
        {"Healthcare Provider Name":"Roaya Eye Center","District":"Central Province","Address 1":"Olaya Dist.","Branch":"King Fahad Road","Address 3":"P.O.Box 68881","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Rokn Abas Polyclinic 6","District":"Central Province","Address 1":"Al jazera Dist","Branch":"Salah Alden St","Address 3":"Po Box 68552","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Rokn Abas Polyclinic 6","District":"Central Province","Address 1":"Al jazera Dist","Branch":"Salah Alden St","Address 3":"Po Box 68552","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Rowad Al Taqadum Medical Complex","District":"Central Province","Address 1":"Al Salamia District","Branch":"P.O. Box 7073","Address 3":"16511","City":"Hotat Bani Tamim","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Roya Optical","District":"Northen Province","Address 1":"Al Daeari Al Thani Dist","Branch":"Across sayed al shohadaa","Address 3":"PO BOX 6476","City":"Madina","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Royal Commission for Jubail","District":"Eastern Province","Address 1":"AL Jubail Industrial City","Branch":"PO Box 11994","Address 3":"Zip code : 31961","City":"Jubail","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Royal Medical Complex","District":"Eastern Province","Address 1":"Al Yasmin District, 60 Street,","Branch":"","Address 3":"","City":"Khafji","Telephone No":{" 1":"137666565"}}
        ,
        {"Healthcare Provider Name":"Royal Medical Complex - Dammam","District":"Eastern Province","Address 1":"Prince Mohammed Street","Branch":"P O Box 1899","Address 3":"Dammam - 31987","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Royal Medical Complex - Khobar","District":"Eastern Province","Address 1":"Prince Motab street","Branch":"P O Box - 899, Khobar - 31971","Address 3":"","City":"Khobar","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Rubban Medical Center","District":"Eastern Province","Address 1":"Saihat District","Branch":"Al Ferdous Street","Address 3":"PO Box 1874, Saihat 31972","City":"Sayhat","Telephone No":{" 1":"138387401"}}
        ,
        {"Healthcare Provider Name":"Saad Al Harthi Medical Center","District":"Central Province","Address 1":"Al Sahafa District","Branch":"Mohammed Ben Abdulaziz Al Deghether St.","Address 3":"PO Box 8720 Riyadh 3332","City":"Riyadh","Telephone No":{" 1":"14897666"}}
        ,
        {"Healthcare Provider Name":"Saad Medical Specialized Group","District":"Southren Province","Address 1":"Prince Sultan City","Branch":"King Fahed Road","Address 3":"PO BOX 1990","City":"Abha","Telephone No":{" 1":"172277755"}}
        ,
        {"Healthcare Provider Name":"SABA 1","District":"Western Province","Address 1":"Bawadi District, 60 Street","Branch":"P.O. Box 14158","Address 3":"21424","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"SABA 2","District":"Western Province","Address 1":"148 Palistine St.-Nora Bldg.","Branch":"P.O. Box 14158","Address 3":"21424","City":"Jeddah","Telephone No":{" 1":"126200129"}}
        ,
        {"Healthcare Provider Name":"SABA Clinic 7","District":"Western Province","Address 1":"Zaid Bin Rabah St.","Branch":"P.O.Box. 14158","Address 3":"21424","City":"Jeddah","Telephone No":{" 1":"012 6404134"}}
        ,
        {"Healthcare Provider Name":"Sada Care Medical Center","District":"Central Province","Address 1":"Qurtoba Dst - Al Galam St","Branch":"P.O.Box 52519 Riyadh 11573","Address 3":"","City":"Riyadh","Telephone No":{" 1":"112224026"}}
        ,
        {"Healthcare Provider Name":"Saeed Al Wadei Medical Complex","District":"Southren Province","Address 1":"PO Box 52","Branch":"","Address 3":"","City":"Abha","Telephone No":{" 1":"172551829"}}
        ,
        {"Healthcare Provider Name":"Saeed Ali Al Ghamdi Polyclinic - Al Mekhwa","District":"Western Province","Address 1":"Al Baha Dist","Branch":"","Address 3":"P.O BOX 106","City":"Mekkwah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Safa Abha Polyclinic","District":"Southren Province","Address 1":"Libnan District","Branch":"Al Farooq Street","Address 3":"PO Box 10844 Abha 61321","City":"Abha","Telephone No":{" 1":"172298884"}}
        ,
        {"Healthcare Provider Name":"Safa Al Madina Hospital","District":"Northen Province","Address 1":"Qeba, Al Bahar Dis","Branch":"PO Box 74","Address 3":"","City":"Madina","Telephone No":{" 1":"148280000"}}
        ,
        {"Healthcare Provider Name":"Safa Dammam Dispensary","District":"Eastern Province","Address 1":"Al Adama District","Branch":"15th street M/A 289","Address 3":"PO Box 7871 Dammam 31472","City":"Dammam","Telephone No":{" 1":"138341016"}}
        ,
        {"Healthcare Provider Name":"Safa Makkah 3","District":"Central Province","Address 1":"Al Morab'a District","Branch":"Prince Abdulrahman Bin Abdulaziz Street","Address 3":"PO Box 66618 Riyadh 11586","City":"Riyadh","Telephone No":{" 1":"114012128"}}
        ,
        {"Healthcare Provider Name":"Safa Makkah Polyclinic","District":"Central Province","Address 1":"Al Batha Street","Branch":"P.O. Box 33318","Address 3":"11586","City":"Riyadh","Telephone No":{" 1":"114026111"}}
        ,
        {"Healthcare Provider Name":"Safa Pioneer Clinic","District":"Western Province","Address 1":"Al Muhamadiah Dist","Branch":"Amnah Bint Abi Wahb St","Address 3":"PO BOX 126210","City":"Jeddah","Telephone No":{" 1":"126228600"}}
        ,
        {"Healthcare Provider Name":"Safa Pioneer Clinic","District":"Western Province","Address 1":"Al Muhamadiah Dist","Branch":"Amnah Bint Abi Wahb St","Address 3":"PO BOX 126210","City":"Jeddah","Telephone No":{" 1":"126228600"}}
        ,
        {"Healthcare Provider Name":"Saha Al Driah Medical Compound","District":"Central Province","Address 1":"King Abdulaziz Road","Branch":"Aldriah - Riyadh","Address 3":"PO Box 28060","City":"Al Diriaya","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Salamat General Medical Complex","District":"Central Province","Address 1":"Al-Jamieyyeen Dist","Branch":"Al Thalatheen Al Janoubi St","Address 3":"P.O. Box 915","City":"Hail","Telephone No":{" 1":"165388888"}}
        ,
        {"Healthcare Provider Name":"Salamat Hospital","District":"Central Province","Address 1":"3529 Jeddah St.","Branch":"Western Montazah","Address 3":"P.O.Box 55427","City":"Hail","Telephone No":{" 1":"165366666"}}
        ,
        {"Healthcare Provider Name":"Salamat Medical Center (1)","District":"Central Province","Address 1":"Al-Madina Street","Branch":"P.O. Box 5334","Address 3":"King Abdulaziz Road","City":"Bureidah","Telephone No":{" 1":"163819966"}}
        ,
        {"Healthcare Provider Name":"Salamat Medical Center (2)","District":"Central Province","Address 1":"Al Sbakh Dist","Branch":"King Abdul Aziz Road","Address 3":"PO BOX 5334","City":"Bureidah","Telephone No":{" 1":"163267441"}}
        ,
        {"Healthcare Provider Name":"Salamatak Medical Complex","District":"Central Province","Address 1":"Khreis Road, PO Box 55874","Branch":"11544","Address 3":".","City":"Riyadh","Telephone No":{" 1":"112269733"}}
        ,
        {"Healthcare Provider Name":"Salamatek Medical Center - Safwa","District":"Eastern Province","Address 1":"Bilal Bin Rabah Street","Branch":"PO Box 269","Address 3":"31921","City":"Safwa","Telephone No":{" 1":"136642193"}}
        ,
        {"Healthcare Provider Name":"Salamaty Medical Complex","District":"Northen Province","Address 1":"Al Mesaedya Dist.","Branch":"King Saud St.","Address 3":"P.O.Box. 878","City":"Arar","Telephone No":{" 1":"146630063"}}
        ,
        {"Healthcare Provider Name":"Saleh Shakeeli General Medical Complex","District":"Southren Province","Address 1":"Al Sheqaiq","Branch":"Al Sahel Road","Address 3":"P.O. Box 11","City":"Gizan","Telephone No":{" 1":"173411171"}}
        ,
        {"Healthcare Provider Name":"Sama Al Basim Vision","District":"Northen Province","Address 1":"Al Sulaimaneya District","Branch":"Prince Mamdoh Street","Address 3":"PO Box 34 Tabuk 71411","City":"Tabuk","Telephone No":{" 1":"144225585"}}
        ,
        {"Healthcare Provider Name":"Samaya Advanced & Cosmetic Dentistry","District":"Western Province","Address 1":"Al Slamah Dis - Princess Sultan St","Branch":"Salamah Center - Box 10703 Jeddah 21474","Address 3":"","City":"Jeddah","Telephone No":{" 1":"126835777"}}
        ,
        {"Healthcare Provider Name":"Sameer Ibrahim Saeedi General Hospital","District":"Western Province","Address 1":"Al-Bahr, Prince Sultan Street","Branch":"P.O. Box 1297","Address 3":"","City":"Yanbu","Telephone No":{" 1":"143915024"}}
        ,
        {"Healthcare Provider Name":"Samerah Polyclinic","District":"Western Province","Address 1":"Azizia Dist. Ahmed Taymoor St.","Branch":"P.O. Box 51763","Address 3":"21553","City":"Jeddah","Telephone No":{" 1":"126744370"}}
        ,
        {"Healthcare Provider Name":"Samtah Medical Polyclinic","District":"Southren Province","Address 1":"Samtah medical Polyclinic","Branch":"P.O Box 388 Jazan 45945","Address 3":"Samtah Ala'am Street","City":"Samtah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Sanad Al Jazeera Polyclinic","District":"Central Province","Address 1":"Al Orayja","Branch":"PO Box 16387","Address 3":"Riyadh 11464","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Sarh Al Tawfeeq Polyclinic","District":"Southren Province","Address 1":"Al Shamali Dist","Branch":"Main Street","Address 3":"PO BOX 333","City":"Gizan","Telephone No":{" 1":"920010866"}}
        ,
        {"Healthcare Provider Name":"Sarya Medical Center - Turaif","District":"Northen Province","Address 1":"Azizia Dist., Prince Abdullah AlFaisal S","Branch":"P.O. Box 118","Address 3":"","City":"Turaif","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Saudi British Hospital","District":"Central Province","Address 1":"Olaya Dist","Branch":"King Fahed Road","Address 3":"PO BOX 285627","City":"Riyadh","Telephone No":{" 1":"114636666"}}
        ,
        {"Healthcare Provider Name":"Saudi German Hospital - Asir","District":"Southren Province","Address 1":"Abha - Al-Khamis Road","Branch":"P.O. Box 2553","Address 3":"","City":"Abha","Telephone No":{" 1":"172355000"}}
        ,
        {"Healthcare Provider Name":"Saudi German Hospital - Madinah","District":"Northen Province","Address 1":"Abyar Ali Dis, Al Jameeat Road","Branch":"P.O. Box 15435","Address 3":"","City":"Madina","Telephone No":{" 1":"148406000"}}
        ,
        {"Healthcare Provider Name":"Saudi German Hospital - Riyadh","District":"Central Province","Address 1":"Sahafa Dist - Exit 4","Branch":"P.O. Box 84348","Address 3":"116711","City":"Riyadh","Telephone No":{" 1":"112685555"}}
        ,
        {"Healthcare Provider Name":"Saudi German Hospitals Group","District":"Western Province","Address 1":"Al Zahra Dist, Batterjee street","Branch":"P.O. Box 2550","Address 3":"21461","City":"Jeddah","Telephone No":{" 1":"122606000"}}
        ,
        {"Healthcare Provider Name":"Saudi Hospital","District":"Western Province","Address 1":"Po Box 18863","Branch":"21425","Address 3":"Al Sahafa Street","City":"Jeddah","Telephone No":{" 1":"126714011"}}
        ,
        {"Healthcare Provider Name":"Saudi Innova Healthcare Company","District":"Central Province","Address 1":"Makkah Al Mukarramah Branch Road","Branch":"Al Radwah - Riyadh 12813 - 7901","Address 3":"Building No - 3107","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Saudi Italy Dental Center - Al Nuairiyah","District":"Eastern Province","Address 1":"Al Faisalyah Dist","Branch":"King Fahed street","Address 3":"PO BOX 31981","City":"Al Nuairyah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Saudi National Hospital","District":"Western Province","Address 1":"Al Aziziya District","Branch":"National Hospital Street","Address 3":"PO Box.52869 Makkah 21573","City":"Makkah","Telephone No":{" 1":"125562177"}}
        ,
        {"Healthcare Provider Name":"Saudi Swiss Consultant Center","District":"Eastern Province","Address 1":"Al maghrabiah Dist","Branch":"King Abdullah St","Address 3":"Box2258","City":"Khobar","Telephone No":{" 1":"138898713"}}
        ,
        {"Healthcare Provider Name":"Selva Medical Clinic","District":"Central Province","Address 1":"Al Montazah ash shargi","Branch":"ali ibn abi Talib Rd","Address 3":"Po Box 1700","City":"Bureidah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Senymar Medical Polyclinic","District":"Central Province","Address 1":"Al Naseem District","Branch":"Osama Bin Zeed Street","Address 3":"PO BOX 26396 Riyadh 11486","City":"Riyadh","Telephone No":{" 1":"12356320"}}
        ,
        {"Healthcare Provider Name":"Shaheen World Center","District":"Central Province","Address 1":"Salahuddin Dist.","Branch":"King Abdul Aziz Road","Address 3":"P.O.Box 65999","City":"Riyadh","Telephone No":{" 1":"114554567"}}
        ,
        {"Healthcare Provider Name":"Shamekh Polyclinic","District":"Western Province","Address 1":"King Fahad Road","Branch":"P.O. Box 542","Address 3":"","City":"Al Baha","Telephone No":{" 1":"177270801"}}
        ,
        {"Healthcare Provider Name":"Shams Al Farabi Dental Complex","District":"Eastern Province","Address 1":"Salman Al Farsi Street","Branch":"P O Box -34985","Address 3":"","City":"Qatif","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Shams Al Tadawee Medical Complex","District":"Central Province","Address 1":"Al Khamees Road,","Branch":"Opposite to Alwalamin garden,","Address 3":"P O Box 10, Wadi Al Dawaser, Riyadh","City":"Wadi Al Dawasr","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Shar Dental Center","District":"Western Province","Address 1":"Mushrefah Dist","Branch":"Prince Majed Street","Address 3":"PO BOX 5025","City":"Jeddah","Telephone No":{" 1":"126720679"}}
        ,
        {"Healthcare Provider Name":"Shifa Al Baraka Medical Center","District":"Western Province","Address 1":"Sahat Islam Dist","Branch":"Al Mansur Street","Address 3":"POBOX 16809","City":"Makkah","Telephone No":{" 1":"125600666"}}
        ,
        {"Healthcare Provider Name":"Shifa Al Bawadi Polyclinic","District":"Western Province","Address 1":"Al Rabwah Distirct,","Branch":"Makaronah Street,","Address 3":"P.O. Box 10038","City":"Jeddah","Telephone No":{" 1":"126625908"}}
        ,
        {"Healthcare Provider Name":"Shifa Al Darb Polyclinic","District":"Southren Province","Address 1":"Al Wasat Dist.","Branch":"Jizan - Makkah Al Mokarama Road","Address 3":"POBox 61311","City":"Al Darb","Telephone No":{" 1":"173461166"}}
        ,
        {"Healthcare Provider Name":"Shifa Al Janoub Polyclinic","District":"Southren Province","Address 1":"Military city road , Front of baladiya","Branch":"Box. 870","Address 3":"Khamis Mushayt","City":"Khamis Mushyat","Telephone No":{" 1":"172233348"}}
        ,
        {"Healthcare Provider Name":"Shifa Al Jubail Medical Center","District":"Eastern Province","Address 1":"PO Box 1593","Branch":"Anain/Riyadh Street","Address 3":"Jubail 31951","City":"Jubail","Telephone No":{" 1":"133611777"}}
        ,
        {"Healthcare Provider Name":"Shifa Al Khamis Polyclinic","District":"Southren Province","Address 1":"Al Darb District","Branch":"PO Box 51029","Address 3":"","City":"Khamis Mushyat","Telephone No":{" 1":"172374233"}}
        ,
        {"Healthcare Provider Name":"Shifa Al Khobar Company Ltd.","District":"Eastern Province","Address 1":"Subekha St","Branch":"PO Box 4970","Address 3":"31952","City":"Khobar","Telephone No":{" 1":"138944984"}}
        ,
        {"Healthcare Provider Name":"Shifa Al Munthaza Polyclinic","District":"Western Province","Address 1":"Al Haramian Dist ,Kilo 10","Branch":"Al Montzahat Al Shargeia","Address 3":"PO Box 11661","City":"Jeddah","Telephone No":{" 1":"126205999"}}
        ,
        {"Healthcare Provider Name":"Shifa Al Rass Polyclinic","District":"Central Province","Address 1":"","Branch":"Al Quds Street, Near NCB","Address 3":"PO BOX 51921","City":"Al Russ","Telephone No":{" 1":"163334035"}}
        ,
        {"Healthcare Provider Name":"Shifa Al Shamly Polyclinic","District":"Central Province","Address 1":"Al Nakheel Dist.","Branch":"King Abdul Aziz Road","Address 3":"P.O.Box 200","City":"Hail","Telephone No":{" 1":"162393030"}}
        ,
        {"Healthcare Provider Name":"Shifa Buraidha Polyclinic","District":"Central Province","Address 1":"Al Wahda, Khubaib","Branch":"PO Box 2275","Address 3":"Buraidha, Al Qassim","City":"Bureidah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Shifa Dammam Dispensary","District":"Eastern Province","Address 1":"Al Atheer Dist","Branch":"King Saud Street","Address 3":"PO BOX 73222","City":"Dammam","Telephone No":{" 1":"138176806"}}
        ,
        {"Healthcare Provider Name":"Shifa Jeddah Polyclinic","District":"Western Province","Address 1":"King Khalid St","Branch":"Sharafiya District","Address 3":"PO Box 16809","City":"Jeddah","Telephone No":{" 1":"126533636"}}
        ,
        {"Healthcare Provider Name":"Shifa Jezan Polyclinic","District":"Southren Province","Address 1":"Omar Bin Al Khatab Street","Branch":"Al Wasat District","Address 3":"PO Box 51029","City":"Gizan","Telephone No":{" 1":"173232266"}}
        ,
        {"Healthcare Provider Name":"Shifa Najran Polyclinic","District":"Southren Province","Address 1":"Al Diyafah Dist.","Branch":"King Saud St.","Address 3":"East Al Diyafah Dist.","City":"Najran","Telephone No":{" 1":"175220888"}}
        ,
        {"Healthcare Provider Name":"Shifa Polyclinic - Abqiq","District":"Eastern Province","Address 1":"Al Taif Road","Branch":"P.O. Box 1","Address 3":"31992","City":"Abqiq","Telephone No":{" 1":"135663444"}}
        ,
        {"Healthcare Provider Name":"Shifa Rahima Medical Center","District":"Eastern Province","Address 1":"Al Shamaliya Dist. Prince Naif Street","Branch":"PO Box 902","Address 3":"31941","City":"Ras Tanura","Telephone No":{" 1":"136672525"}}
        ,
        {"Healthcare Provider Name":"Shifa Taibah Polyclinic","District":"Northen Province","Address 1":"Saad Bin Khethmah Road","Branch":"Al Hezam St.","Address 3":"P.O.Box. 25008","City":"Madina","Telephone No":{" 1":"148444499"}}
        ,
        {"Healthcare Provider Name":"Shoa'a Al Amal Polyclinic","District":"Northen Province","Address 1":"PO Box 6","Branch":"Haqil","Address 3":"","City":"Tabuk","Telephone No":{" 1":"144532922"}}
        ,
        {"Healthcare Provider Name":"Shoa'a Medical Complex","District":"Central Province","Address 1":"Al-Waroud Area","Branch":"P.O. Box 17045","Address 3":"11484","City":"Riyadh","Telephone No":{" 1":"114588444"}}
        ,
        {"Healthcare Provider Name":"Shorooq Al-Faiha Polyclinic","District":"Central Province","Address 1":"Al Daweesh, Al Bareed Street","Branch":"P O Box 120785","Address 3":"11689","City":"Al Artawiya","Telephone No":{" 1":"164360333"}}
        ,
        {"Healthcare Provider Name":"Shoroq Medical Center","District":"Central Province","Address 1":"Al Khalij District","Branch":"Ibn Al Haytham Street","Address 3":"PO Box 45444 Riyadh 11512","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Silver Crescent Dispensary","District":"Eastern Province","Address 1":"Al Thuqbah Dist,","Branch":"Badr Al Olla Street","Address 3":"PO BOX 1968","City":"Khobar","Telephone No":{" 1":"138650005"}}
        ,
        {"Healthcare Provider Name":"Smile Dental Center","District":"Eastern Province","Address 1":"Al Faisaleyah District","Branch":"Omar Bin Al Khatab Street","Address 3":"PO Box 1385 Dammam 31811","City":"Dammam","Telephone No":{" 1":"138117260"}}
        ,
        {"Healthcare Provider Name":"Society Dental Clinics Complex","District":"Central Province","Address 1":"PO Box 7927","Branch":"11472","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Specialised Polyclinic Complex","District":"Eastern Province","Address 1":"Al Qatif Street , behind of Riyad Bank","Branch":"Al Hazem Dist. Block 76/D","Address 3":"Ali Abdulmohsen Al Madan Building","City":"Safwa","Telephone No":{" 1":"136644116"}}
        ,
        {"Healthcare Provider Name":"Specialist Dental Treatment Center","District":"Eastern Province","Address 1":"Al Tubishi Dist,","Branch":"King Faisal Street","Address 3":"PO BOX 2615","City":"Dammam","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Specialized Medical Center & Hospital","District":"Central Province","Address 1":"Takhassusi Street","Branch":"P.O. Box 66548","Address 3":"11586","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Specialized Medical Center & Hospital - 2","District":"Central Province","Address 1":"Prince Saud Ibn Abdulaziz street","Branch":"King Faisal Dist, Buding No 2984,","Address 3":"ZIP 13215-8138 Unit 304","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Sudair Clinics","District":"Central Province","Address 1":"Al Jamyeen Dst King Khalid St","Branch":"P.O.Box 767 AL Majmaah 11952","Address 3":"","City":"Al Majmaa","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Sultan Polyclinic Center","District":"Northen Province","Address 1":"Al Faisaliah Dis .","Branch":"Turaif St.","Address 3":"B.O.Box.183","City":"Turaif","Telephone No":{" 1":"146523505"}}
        ,
        {"Healthcare Provider Name":"Sumuo Medical Complex","District":"Eastern Province","Address 1":"King Saud Road, Kurthuba, Khobar","Branch":"PO Box - 7189, Khobar - 34257","Address 3":"","City":"Khobar","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Sun city Polyclinic Co. Ltd - Riyadh","District":"Central Province","Address 1":"Bathaa Dist,","Branch":"Omar Al Mukhtar St.","Address 3":"PO BOX 61587","City":"Riyadh","Telephone No":{" 1":"114068885"}}
        ,
        {"Healthcare Provider Name":"Tabbara Optical","District":"Central Province","Address 1":"Al Olaya Dist.","Branch":"Al Olaya General St.","Address 3":"P.O.Box 301900","City":"Riyadh","Telephone No":{" 1":"112112401"}}
        ,
        {"Healthcare Provider Name":"Tabeebuk Polyclinic","District":"Central Province","Address 1":"Al Rayan Dist.","Branch":"Abu Baker Street","Address 3":"PO.Box 6618","City":"Al Kharj","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Tabuk National Polyclinic (Tabuk)","District":"Northen Province","Address 1":"P.O. Box 55","Branch":"","Address 3":"","City":"Tabuk","Telephone No":{" 1":"144225545"}}
        ,
        {"Healthcare Provider Name":"Tadawee Al Riyadh Medical Complex","District":"Central Province","Address 1":"Al Shohadaa Dist","Branch":"Khalid Bin Al Waleed St,","Address 3":"PO BOX 20689","City":"Riyadh","Telephone No":{" 1":"112533999"}}
        ,
        {"Healthcare Provider Name":"Tadawi General Hospital","District":"Eastern Province","Address 1":"First street, Behind Sheraton Hotel","Branch":"P.O. Box 3823","Address 3":"31481","City":"Dammam","Telephone No":{" 1":"138346777"}}
        ,
        {"Healthcare Provider Name":"Tadawi Medical Center","District":"Southren Province","Address 1":"King Abdullah road","Branch":"Al Mosa Disrict","Address 3":"","City":"Khamis Mushyat","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Tadawi Surgical Center","District":"Western Province","Address 1":"Shehar Dist","Branch":"Main Shehar Street","Address 3":"PO BOX 795","City":"Taif","Telephone No":{" 1":"127448888"}}
        ,
        {"Healthcare Provider Name":"Taif Medical Center","District":"Central Province","Address 1":"Takhassusi Street","Branch":"P.O. Box 1428","Address 3":"11431","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Taj Polyclinic","District":"Western Province","Address 1":"Al Mahjar Street","Branch":"P.O. Box 32621","Address 3":"21438","City":"Jeddah","Telephone No":{" 1":"126355715"}}
        ,
        {"Healthcare Provider Name":"Taleen Dental Center","District":"Central Province","Address 1":"Ashbelia Dist","Branch":"Al Sahabah St.","Address 3":"69724","City":"Riyadh","Telephone No":{" 1":"112020111"}}
        ,
        {"Healthcare Provider Name":"Tanouma Medical Polyclinic","District":"Western Province","Address 1":"Al Mthlth District","Branch":"Tanouma Al Aam Street","Address 3":"P.O BOX 98","City":"Tanoma","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Tebabat Jeddah Polyclinic","District":"Western Province","Address 1":"744, Ahmed Zinal Street","Branch":"23525","Address 3":"","City":"Jeddah","Telephone No":{" 1":"126829522"}}
        ,
        {"Healthcare Provider Name":"The Elite Medical Complex","District":"Western Province","Address 1":"Al Aziziah Dist.","Branch":"Al Haram Road","Address 3":"Al Rajhi Center, 4th Floor","City":"Makkah","Telephone No":{" 1":"125614001"}}
        ,
        {"Healthcare Provider Name":"The Elite Medical Complex 3","District":"Western Province","Address 1":"Al Shawqiah - General St","Branch":"Front Al Moustahlik Market","Address 3":"P.O. Box 1847","City":"Makkah","Telephone No":{" 1":"125614001"}}
        ,
        {"Healthcare Provider Name":"The Eye Consultants - Jeddah","District":"Western Province","Address 1":"Al Rawdah Dist,","Branch":"Al Nahdah Al Hadiisah St.","Address 3":"Box,15637","City":"Jeddah","Telephone No":{" 1":"126686161"}}
        ,
        {"Healthcare Provider Name":"The First Clinic","District":"Western Province","Address 1":"Al Zahra District","Branch":"King Abdulaziz Road, Etoile Center","Address 3":"","City":"Jeddah","Telephone No":{" 1":"012-920029090"}}
        ,
        {"Healthcare Provider Name":"Top Medicine Medical Complex","District":"Central Province","Address 1":"West Ring Road - Exit. 34","Branch":"Dahyat Labn Dist. Al Taif St.","Address 3":"P.O.Box. 123850","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Tulip Medical Complex","District":"Eastern Province","Address 1":"Al Masiaf Dist","Branch":"Al Waleed Bin AbdulMalik","Address 3":"P.O Box 2485","City":"Hafr Al Batin","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Turaif National Clinic","District":"Northen Province","Address 1":"Al Yarmook Dist","Branch":"Eastern District, 20 Street,","Address 3":"Box,5","City":"Arar","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Tutia Trading Est. Optical","District":"Central Province","Address 1":"Al Olaya Dist.","Branch":"Al Takhasosi St.","Address 3":"POBox 51284","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Typical Medical Clinic Complex","District":"Central Province","Address 1":"Al Nazeem District, Al Nadwah Street","Branch":"PO Box 104164","Address 3":"","City":"Riyadh","Telephone No":{" 1":"112454444"}}
        ,
        {"Healthcare Provider Name":"Umm Al Hammam Chartable Society Medical Center","District":"Eastern Province","Address 1":"Zain Alabdeen St.","Branch":"Um Al Hammam Dist.","Address 3":"P.O.Box. 17030","City":"Qatif","Telephone No":{" 1":"138367888"}}
        ,
        {"Healthcare Provider Name":"United Clinics Medical Complex","District":"Northen Province","Address 1":"Al Madinah","Branch":"Hwisah Bin Masuood St.","Address 3":"B.O.Box 7173","City":"Madina","Telephone No":{" 1":"920004660"}}
        ,
        {"Healthcare Provider Name":"United Medical Clinic","District":"Central Province","Address 1":"Al Nazeem District","Branch":"Al Thlatheen Street","Address 3":"PO Box 120837 Riyadh 11689","City":"Riyadh","Telephone No":{" 1":"12454334"}}
        ,
        {"Healthcare Provider Name":"United/Alrowida/Ammar/Khalid/Talal Pharmacies","District":"Western Province","Address 1":"Moukhatat bin yaqub","Branch":"East of highway","Address 3":"PO BOX 10901","City":"Jeddah","Telephone No":{" 1":"126511504"}}
        ,
        {"Healthcare Provider Name":"Victoria Medical Hospital","District":"Central Province","Address 1":"Al Rawdah Dist.","Branch":"Khreis Road","Address 3":"P.O.Box 285627","City":"Riyadh","Telephone No":{" 1":"112097777"}}
        ,
        {"Healthcare Provider Name":"View Clinic - Dental","District":"Central Province","Address 1":"Al Olaya Dis .","Branch":"King Fahad St.","Address 3":"P.O.Box. 2177","City":"Riyadh","Telephone No":{" 1":"920017020"}}
        ,
        {"Healthcare Provider Name":"Viola Medical Complex","District":"Central Province","Address 1":"King Fahad Road","Branch":"Al Muhammadiyah Dist - Hawtat Bani Tamim","Address 3":"16631, 9233","City":"Hotat Bani Tamim","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Vitamin Medical Consultative Center 2","District":"Central Province","Address 1":"Al Naseem Dis .","Branch":"Hassan Bin Thabit St.","Address 3":"B.O.Box. 28562","City":"Riyadh","Telephone No":{" 1":"112793333"}}
        ,
        {"Healthcare Provider Name":"Vitamin Medical Consultative Center 3","District":"Central Province","Address 1":"Al Qouds Dst - Khalid Bin Al Waleed St","Branch":"P.O.Box 28562 Riyadh 11323","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Vitamin Medical Consultative Center 6","District":"Central Province","Address 1":"Al Shifa Dst - Al Steen St","Branch":"P.O.Box 285627 Riyadh 11323","Address 3":"","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Wadi Ram Dental Care","District":"Eastern Province","Address 1":"Al Wajha Al Bahriah","Branch":"Jubail industrial","Address 3":"PO BOX 32074","City":"Jubail","Telephone No":{" 1":"133472323"}}
        ,
        {"Healthcare Provider Name":"Wahat Al Mas Dental Center","District":"Central Province","Address 1":"Al Hamra Dist","Branch":"King Abdullah Street","Address 3":"PO BOX 100792","City":"Riyadh","Telephone No":{" 1":"112487888"}}
        ,
        {"Healthcare Provider Name":"Wahat Al Shifa Complex","District":"Northen Province","Address 1":"At the beginning of Al Oyon Road","Branch":"Sultana Street","Address 3":"PO Box","City":"Madina","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Wahat Al Shifa General Complex 2","District":"Northen Province","Address 1":"Al Nasr Dist","Branch":"P.O BOX 1095","Address 3":"41431","City":"Madina","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Wahat Al Shifa Medical Center","District":"Western Province","Address 1":"Industrial City, Phase 3","Branch":"P.O. Box 14158","Address 3":"21424","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Wasni Medical Complex","District":"Southren Province","Address 1":"Thandaha St, North of Moosa Mahathwa","Branch":"PO Box 33","Address 3":"61912 Khamis Mushyat","City":"Khamis Mushyat","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Wasni Medical Complex - Khaibar Al Janoub","District":"Southren Province","Address 1":"Khaibar Al JAnoub","Branch":"Main St","Address 3":"Po Box 33","City":"Khamis Mushyat","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Wasni Medical Complex - Wadi Hashbal","District":"Southren Province","Address 1":"Wadi Bin Hashbal - Oraija Dist.","Branch":"General Road.","Address 3":"P.O.Box. 61912","City":"Abha","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Watanak Polyclinic","District":"Western Province","Address 1":"Al Safa District","Branch":"Umm Al Qura Street","Address 3":"PO Box 139871 Jeddah 21323","City":"Jeddah","Telephone No":{" 1":"122655333"}}
        ,
        {"Healthcare Provider Name":"Weqaya Medical Complex","District":"Central Province","Address 1":"Al Aqeeq Area","Branch":"Sulimanaiah St","Address 3":"PO BOX 20828","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Weqaya Polyclinic","District":"Northen Province","Address 1":"Al Hira Road","Branch":"Prince Naief Plan","Address 3":"P O Box 4689","City":"Madina","Telephone No":{" 1":"148313999"}}
        ,
        {"Healthcare Provider Name":"Wesam Optical","District":"Western Province","Address 1":"Omar Bin Al Khatab Street","Branch":"Al Zhoor District","Address 3":"PO Box 840","City":"Yanbu","Telephone No":{" 1":"143221446"}}
        ,
        {"Healthcare Provider Name":"Worof Medical Polyclinic","District":"Central Province","Address 1":"Al Wadi Dist,","Branch":"Al Bahr Al Ahmar St,","Address 3":"PO BOX 69416","City":"Riyadh","Telephone No":{" 1":"112755500"}}
        ,
        {"Healthcare Provider Name":"Yanbu National Hospital","District":"Western Province","Address 1":"PO Box 31125","Branch":"Madinat Yanbu Al Sinaiyah","Address 3":"","City":"Yanbu","Telephone No":{" 1":"143962000"}}
        ,
        {"Healthcare Provider Name":"Your Doctor Consultation Polyclinic","District":"Western Province","Address 1":"Om al Sebaa Dist","Branch":"Mian South Road","Address 3":"Po Box 3558","City":"Taif","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Your Eyes Optical","District":"Central Province","Address 1":"Al Maather Dist","Branch":"Al Takhasussi St.","Address 3":"PO BOX 50008","City":"Riyadh","Telephone No":{" 1":"114822721"}}
        ,
        {"Healthcare Provider Name":"Your Health Medical Complex","District":"Western Province","Address 1":"Al Washhaa Dist .","Branch":"Southern Road","Address 3":"PO Box 26513","City":"Taif","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Your Health Rehabilitation Center","District":"Western Province","Address 1":"Prince Sultan St.","Branch":"Al Naeem Dist.","Address 3":"P.O.Box. 39168","City":"Jeddah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Your Healthcare Medical Polyclinic","District":"Western Province","Address 1":"Al Nuzha Dist.","Branch":"Al Hejaz St.","Address 3":"P.O.Box. 40","City":"Ranyah","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Zahraa Al Jouf Polyclinic","District":"Northen Province","Address 1":"Al Aziziyah Dist.","Branch":"PO Box 1360","Address 3":"","City":"Sakaka","Telephone No":{" 1":"146244442"}}
        ,
        {"Healthcare Provider Name":"Zahrat Al Amal Polyclinic (1)","District":"Central Province","Address 1":"Al Badea'a District","Branch":"Al Madina Al Menawra Street","Address 3":"PO Box 57927 Riyadh 11584","City":"Riyadh","Telephone No":{" 1":"114319988"}}
        ,
        {"Healthcare Provider Name":"Zahrat Al Amal Polyclinic (2)","District":"Central Province","Address 1":"Al Areeja'a District","Branch":"Bilal Ibn Rabah Street","Address 3":"PO Box 57927 Riyadh 11584","City":"Riyadh","Telephone No":{" 1":"14318019"}}
        ,
        {"Healthcare Provider Name":"Zahrat Al Farabi Dental Center","District":"Central Province","Address 1":"Al azizia Dist","Branch":"Nahawand St","Address 3":"Po Box 24897","City":"Riyadh","Telephone No":{" 1":""}}
        ,
        {"Healthcare Provider Name":"Zain Medical Center","District":"Southren Province","Address 1":"Abu Al Saoud Dist","Branch":"Turki Al Madi St","Address 3":"Box,5453","City":"Najran","Telephone No":{" 1":"175430303"}}
        ,
        {"Healthcare Provider Name":"Zam Zam Medical Complex","District":"Eastern Province","Address 1":"Al Raf'a Al Shamaleia District","Branch":"PO Box 10191 Ahsa 31982","Address 3":"","City":"Al Hasa","Telephone No":{" 1":"135303377"}}
        ,
        {"Healthcare Provider Name":"Zamzam Polyclinic","District":"Central Province","Address 1":"Al Azizia District","Branch":"King Faisal Street","Address 3":"PO Box 92 Hail 1","City":"Hail","Telephone No":{" 1":"165312121"}}
        ,
        {"Healthcare Provider Name":"Zarka El Yamama Optics Est","District":"Central Province","Address 1":"Olaya District","Branch":"Prince Sultan Bin Abdul Aziz St","Address 3":"Box 4467","City":"Riyadh","Telephone No":{" 1":"114616297"}}
        ,
        {"Healthcare Provider Name":"Zuhair Al Showekhat Optical Centers","District":"Eastern Province","Address 1":"Al Deerah Dist","Branch":"Omar Bin Abdulaziz St","Address 3":"PO BOX 324","City":"Sayhat","Telephone No":{" 1":"138394200"}}
    ];
    const log = require('../utils/logger');
    for (let i of hospitalsList) {
        let hospitalName = i['Healthcare Provider Name'];
        let contactPersonPhone = i['Telephone No'][' 1'];
        
        let clearUniqueName = hospitalName.replace( /[0-9\s)(&/\,'`._-]/g, '').toLowerCase();
        function randomLetter()
        {
            var string = '';
            var possible = 'abcdefghijklmnopqrstuvwxyz';
        
            for( let i = 0; i < 5; i++ ) {
                string += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return string;
        }
        let uniqueName = clearUniqueName + randomLetter();

        let owner = 'admin';
        let created_at = Date.now();
        let updated_at = Date.now();

        db.get(`SELECT name FROM hospitals WHERE name = ?`, hospitalName, (err, data) => {
            if (err) {
                log.error(`check hospital name. ${err}`);
            }
            if (!data) {
                let data = [hospitalName, uniqueName, contactPersonPhone, owner, created_at, updated_at];
                let stmt = db.prepare(`INSERT INTO hospitals(name, name_unique, contact_person_phone, owner, created_at, updated_at) 
                    VALUES (?, ?, ?, ?, ?, ?)`);
                    stmt.run(data, (err) => {
                    if (err) {
                        log.error(`insert data hospitals_list. ${err}`);
                    }
                });
                stmt.finalize();
            }
        });
    }

    db.get(`SELECT count(*) as count_hospitals FROM hospitals`, (err, data) => {
        if (err) {
            log.error(`check hospital name. ${err}`);
        }
        log.info(`in the database of ${data.count_hospitals} hospitals`);
    });
}
