import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ResumeComponent } from './features/resume/resume.component';
import { ContactComponent } from './features/contact/contact.component';

export const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'home', component: HomeComponent},
    {path: 'resume', component: ResumeComponent},
    {path: 'contact', component: ContactComponent},
];
