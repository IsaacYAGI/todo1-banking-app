import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OthersTransferSummaryPage } from './others-transfer-summary.page';

describe('OthersTransferSummaryPage', () => {
  let component: OthersTransferSummaryPage;
  let fixture: ComponentFixture<OthersTransferSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersTransferSummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OthersTransferSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
