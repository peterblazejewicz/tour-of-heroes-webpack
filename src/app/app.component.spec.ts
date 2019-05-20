import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '@toh/app.component';
import { MessagesComponent } from '@toh/messages/messages.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      declarations: [AppComponent, MessagesComponent],
      imports: [RouterTestingModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
      });
  }));

  it('should display expectted title', () => {
    const debugElement = fixture.debugElement.query(By.css('h1'));
    fixture.detectChanges();
    expect(debugElement.nativeElement.textContent).toEqual('Tour of Heroes');
  });

  it('should display a different test title', () => {
    const debugElement = fixture.debugElement.query(By.css('h1'));
    fixture.componentInstance.title = 'Test Title';
    fixture.detectChanges();
    expect(debugElement.nativeElement.textContent).toEqual('Test Title');
  });
});
