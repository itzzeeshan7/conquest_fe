import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { OpenData } from './external-apis.model';

@Component({
  selector: 'app-external-apis',
  templateUrl: './external-apis.component.html',
  styleUrls: ['./external-apis.component.scss'],
  standalone: false,
})
export class ExternalApisComponent implements OnInit {
  openDataApis: OpenData[];
  openDataApisCopy: OpenData[];
  disableSaveData = false;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.getAll();
  }

  save(openData: any) {
    if (openData.id === 4) {
      if (openData.queryString === 'SaveData' && this.disableSaveData === false) {
        this.disableSaveData = true;
        this.userService.saveData(openData).subscribe(() => {});
      }
    } else {
      this.userService.updateOpenDataQueryString(openData).subscribe(() => {
        openData.edit = false;
        this.getAll();
      });
    }
  }

  getAll() {
    this.userService.getAllOpenDataApis().subscribe((openDataApis: OpenData[]) => {
      this.openDataApis = openDataApis;
      this.openDataApisCopy = [...openDataApis];
      this.openDataApis.push({ id: 4, name: 'SaveData', url: '', queryString: '' });
    });
  }

  toggleEdit(api: any) {
    if (api.edit) {
      this.openDataApis = JSON.parse(JSON.stringify(this.openDataApisCopy));
    }

    api.edit = !api.edit;
  }
}
