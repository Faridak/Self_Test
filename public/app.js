var firebaseConfig = {
  apiKey: "AIzaSyDoVIGopsMI9gOp3VKnDFibO1UggAo-ZH0",
  authDomain: "cov-checker.firebaseapp.com",
  databaseURL: "https://cov-checker.firebaseio.com",
  projectId: "cov-checker",
  storageBucket: "cov-checker.appspot.com",
  messagingSenderId: "294769795175",
  appId: "1:294769795175:web:50b13f75d815028acff4c2",
  measurementId: "G-BL8S1BW7XG",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

db.settings({ ignoreUndefinedProperties: true });
console.log(`db: `, db);

let symptoms = {};

function sym(symptoms_name, value) {
  symptoms[symptoms_name] = value;
  console.log("symptoms: ", symptoms);
}

function ok() {
  let geo;
  const coords = JSON.parse(localStorage.getItem("user_location"));

  if (!coords) {
    geo = undefined;
  } else {
    geo = new firebase.firestore.GeoPoint(coords[0], coords[1]);
  }

  console.log("coords: ", coords);
  console.log("geo: ", geo);

  db.collection("symptoms")
    .add({
      cough: symptoms.cough,
      cold: symptoms.cold,
      diarrhea: symptoms.diarrhea,
      sorethroat: symptoms.sorethroat,
      bodypain: symptoms.bodypain,
      headache: symptoms.headache,
      fever: symptoms.fever,
      breathing: symptoms.breathing,
      fatigue: symptoms.fatigue,
      smellTaste: symptoms.smellTaste,
      infectedArea: symptoms.infectedArea,
      directContacts: symptoms.directContact,
      vaccine: symptoms.vaccine,
      phone: document.getElementById("phone").value,
      timer: document.getElementById("sw-time").innerHTML,
      holder: document.getElementById("holder").innerHTML,
      coordinates: geo,
      timestamp: Date.now(),
    })
    .then(function (doc) {
      console.log("Done! docId: ", doc.id);
    })
    .catch((err) => console.log("ok err: ", err));
}

