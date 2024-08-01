import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ExperienciasComponent } from '../components/experiencias/experiencias.component';
import { SkillsComponent } from '../components/skills/skills.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'main',
    component: HomeComponent,
  },
  {
    path:'experiencias',
    component: ExperienciasComponent,
  },
  {
    path:'skills',
    component: SkillsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
