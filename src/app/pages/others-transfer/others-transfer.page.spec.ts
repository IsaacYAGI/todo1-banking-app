import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OthersTransferPage } from './others-transfer.page';

describe('OthersTransferPage', () => {
  let component: OthersTransferPage;
  let fixture: ComponentFixture<OthersTransferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersTransferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OthersTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
