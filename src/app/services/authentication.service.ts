import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY ='auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationsState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  login() {
    return this.storage.set(TOKEN_KEY, 'Bearer 12345')
    .then(res => {
      this.authenticationsState.next(true);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY)
    .then(() => {
      this.authenticationsState.next(false);
    });
  }

  isAuthentic() {
    return this.authenticationsState.value;
  }

  checkToken() {
    return this.storage.get(TOKEN_KEY)
    .then(res => {
      if (res){
        this.authenticationsState.next(true);
      }
    });
  }


}
