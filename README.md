# To-Do App

Naša To-Do aplikacija vam omogoča enostavno organizacijo vašega časa. V njej lahko dodajate nove naloge, jih urejate, iščete po vsebini, jih označite kot dokončane in jih nato izbrišete. 

## Ključne funkcionalnosti

- Ustvarjanje, urejanje, brisanje in iskanje nalog.
- Označevanje nalog kot dokončanih.
- Brisanje vseh označenih (dokončanih) nalog.
- Prikaz vseh nalog in iskanje po naslovu.


### Backend

Backend uporablja **Spring Boot** za obdelavo podatkov in vključuje naslednje komponente:

- **Controllers**: `DataController` za upravljanje nalog, vključno s pridobivanjem nalog, dodajanjem novih, posodabljanjem statusa, brisanjem in iskanjem nalog.
- **Models**: Vključuje entiteto `TaskData` za reprezentacijo nalog.
- **Repositories**: `TaskRepository` za komunikacijo z bazo podatkov, vključno z iskanjem nalog po naslovu.
- **Services**: `TaskService` vsebuje logiko aplikacije za pridobivanje, shranjevanje, brisanje in posodabljanje nalog.

### Frontend

Frontend je razvit v **ReactJS**

## Orodja in verzije

- **Backend:**
  - Spring Boot 3.0+
  - Maven za upravljanje odvisnosti
  - MySQL za podatkovno bazo

- **Frontend:**
  - ReactJS 18+
  - NodeJS 16+
  - CSS za stilizacijo


## Navodila za namestitev

### Backend

1. Klonirajte repozitorij:
    git clone https://github.com/verclukacode/ris.git

2. Prepričajte se, da imate nameščen Java 17+ in MySQL.

3. Ustvarite MySQL bazo podatkov z imenom todo.

4. V datoteki application.properties prilagodite nastavitve baze:
        spring.datasource.url=jdbc:mysql://localhost:3306/todo
        spring.datasource.username=your_username
        spring.datasource.password=your_password

5. Zaženite aplikacijo z Maven:
        mvn spring-boot:run


### Frontend

1. Pojdite v direktorij frontend:
        cd frontend

2. Namestite odvisnosti:
        npm install

3. Zaženite React aplikacijo:
        npm start


##  Navodila za razvijalce

### Prispevanje

1. Ustvarite kopijo repozitorija.

2. Ustvarite novo vejo za vašo funkcionalnost:
        git checkout -b ime-funkcionalnosti

3. Opravite spremembe in naredite commit:
        git commit -m "Dodana nova funkcionalnost"

4. Pošljite pull request za pregled:
        git push origin ime-funkcionalnosti



## Implementirali smo nove funkcionalnosti, ki vključujejo:

Dodajanje stopnje pomembnosti opravilom,
filtriranje opravil glede na stopnjo pomembnosti,
dodajanje kratkega opisa opravil.


## Kako nove funkcionalnosti delujejo?
Uporabniki lahko ob ustvarjanju ali urejanju opravila določijo stopnjo pomembnosti (low, medium, high). Opravila je nato mogoče filtrirati po pomembnosti, kar omogoča boljšo organizacijo. Prav tako lahko ob vsakem opravilu dodajo kratek opis, ki zagotavlja dodatne informacije ali kontekst.

## Kako lahko uporabnik preizkusi nove funkcionalnosti?
Uporabniki lahko dostopajo do novih funkcionalnosti na naslednje načine:

Pri dodajanju novega opravila v aplikacijo je na voljo polje za določitev stopnje pomembnosti in polje za kratek opis.
Na seznamu opravil lahko uporabniki izberejo filter in izberejo želeno stopnjo pomembnosti, da prikažejo samo ustrezna opravila.
Obstoječa opravila lahko urejajo in jim dodajo pomembnost ali opis preko urejevalnega vmesnika.
   


## Avtorji
    Luka Verč in Jaka Volaj in Klemen Novak

## Licenca
    To-Do aplikacija še ni licencirana.

