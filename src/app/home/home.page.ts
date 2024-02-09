import { Component } from '@angular/core';
import { Firestore, doc, getDoc, DocumentSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Propiedades para el estado de los LEDs
  led1State: any;
  led2State: any;
  led3State: any;

  // Propiedades para el control de los LEDs
  ledControl: boolean = false;
  led1On: boolean = false;
  led2On: boolean = false;
  led3On: boolean = false;
  led4On: boolean = false;
  led5On: boolean = false;
  allOn: boolean = false;
  allOff: boolean = false;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    // Inicialización de los estados de los LEDs
    this.retrieveLed1State();
    this.retrieveLed2State();
    this.retrieveLed3State();
    this.retrieveAllLedStates();
  }

  // Métodos para el control de cada LED individualmente
  async turnOnLed1() {
    this.ledControl = true;
    this.led1On = false;
  }

  async turnOffLed1() {
    this.led1On = true;
    this.ledControl = false;
  }

  async turnOnLed2() {
    this.led2On = true;
    this.led3On = false;
  }

  async turnOffLed2() {
    this.led2On = false;
    this.led3On = true;
  }

  async turnOnLed3() {
    this.led4On = true;
    this.led5On = false;
  }

  async turnOffLed3() {
    this.led4On = false;
    this.led5On = true;
  }

  // Métodos para el control de todos los LEDs
  async turnOnAllLeds() {
    this.ledControl = true;
    this.led1On = false;
    this.led2On = true;
    this.led3On = false;
    this.led4On = true;
    this.led5On = false;
    this.allOff = false;
    this.allOn = true;
  }

  async turnOffAllLeds() {
    this.led1On = true;
    this.ledControl = false;
    this.led2On = false;
    this.led3On = true;
    this.led4On = false;
    this.led5On = true;
    this.allOff = true;
    this.allOn = false;
  }

  // Métodos para establecer el color de los botones
  buttonColorOn(state: boolean): string {
    return state ? "warning" : "dark";
  }

  buttonColorOff(state: boolean): string {
    return state ? "secondary" : "dark";
  }

  // Métodos para recuperar los estados de los LEDs individuales
  async retrieveLed1State() {
    const docRef = doc(this.firestore, "controlLED", 'LED1');
    const snapshot: DocumentSnapshot<any> = await getDoc(docRef);
    if (snapshot.exists()) {
      this.led1State = snapshot.data()?.encender;
      if (this.led1State === true) {
        this.ledControl = true;
      } else {
        this.led1On = true;
      }
    }
  }

  async retrieveLed2State() {
    const docRef = doc(this.firestore, "controlLED", 'LED2');
    const snapshot: DocumentSnapshot<any> = await getDoc(docRef);
    if (snapshot.exists()) {
      this.led2State = snapshot.data()?.encender2;
      if (this.led2State === true) {
        this.led2On = true;
      } else {
        this.led2On = true;
      }
    }
  }

  async retrieveLed3State() {
    const docRef = doc(this.firestore, "controlLED", 'LED3');
    const snapshot: DocumentSnapshot<any> = await getDoc(docRef);
    if (snapshot.exists()) {
      this.led3State = snapshot.data()?.encender3;
      if (this.led3State === true) {
        this.led3On = true;
      } else {
        this.led3On = true;
      }
    }
  }

  // Método para recuperar el estado de todos los LEDs
  async retrieveAllLedStates() {
    const docRef1 = doc(this.firestore, "controlLED", 'LED1');
    const snap1: DocumentSnapshot<any> = await getDoc(docRef1);
    const docRef2 = doc(this.firestore, "controlLED", 'LED2');
    const snap2: DocumentSnapshot<any> = await getDoc(docRef2);
    const docRef3 = doc(this.firestore, "controlLED", 'LED3');
    const snap3: DocumentSnapshot<any> = await getDoc(docRef3);

    if (snap1.exists() && snap2.exists() && snap3.exists()) {
      const led1State = snap1.data()?.encender;
      const led2State = snap2.data()?.encender2;
      const led3State = snap3.data()?.encender3;

      if (led1State && led2State && led3State) {
        this.allOn = true;
      } else {
        this.allOff = true;
      }
    }
  }
}
