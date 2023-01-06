import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { PoeService } from '../../services/poe/poe.service';
import { take } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { PoeForm } from 'src/app/core/forms/poe-form';
import { FormGroup } from '@angular/forms';
import { Poe } from 'src/app/core/models/poe';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  isAddMode: boolean = true;
  form!: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _poeService: PoeService
  ) { }

  ngOnInit(): void {
    let formBuilder: PoeForm;

    this._route.paramMap
      .subscribe((paramMap: ParamMap) => {
        const id: string | null = paramMap.get('id');
        if (id) {
          this.isAddMode = false;
          this._poeService.findOne(+id)
            .pipe(
              take(1)
            )
            .subscribe({
                next: (httpResponse: HttpResponse<any>) => {
                  formBuilder = new PoeForm(httpResponse.body);
                  this.form = formBuilder.build().form;
                },
                error: (error: any) => {
                  console.log(`Something went wrong !`);
                }
              }

            )
        } else {
          // Simple add form
          this.form = new PoeForm(new Poe()).build().form;
        }
      })
  }

}
