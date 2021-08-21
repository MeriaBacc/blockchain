import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { IslogedinGuard } from 'src/islogedin.guard';
import { AddClassComponent } from './add-class/add-class.component';
import { AdminComponent } from './admin/admin.component';
import { CanAccessProjectGuard } from './can-access-project.guard';
import { ClientSpaceComponent } from './client-space/client-space.component';
import { ConfidentialiteComponent } from './confidentialite/confidentialite.component';
import { HomeComponent } from './home/home.component';
import { MentionLegalesComponent } from './mention-legales/mention-legales.component';
import { MentionSpaceComponent } from './mention-space/mention-space.component';
import { OurPackageComponent } from './our-package/our-package.component';
import { PodcastComponent } from './podcast/podcast.component';
import { ProjectComponent } from './project/project.component';
import { ResultComponent } from './result/result.component';
import { ServiceComponent } from './service/service.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UploadDataComponent } from './upload-data/upload-data.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'my_space/add_class/:id', component: AddClassComponent ,canActivate:[IslogedinGuard]},
  { path: 'my_mention_space', component: MentionSpaceComponent ,canActivate:[IslogedinGuard]},
  { path: 'my_space/project/:id/results', component: ResultComponent,canActivate:[IslogedinGuard,CanAccessProjectGuard] },
  { path: 'my_space/project/:id', component: ProjectComponent, canActivate:[IslogedinGuard,CanAccessProjectGuard] },
  { path: 'podcast', component: PodcastComponent },
  { path: 'my_space/upload_data',component: UploadDataComponent},
  { path: 'my_space', component: ClientSpaceComponent ,canActivate:[IslogedinGuard]},
  { path: 'our_package', component: OurPackageComponent },
  { path: 'about', component: WhoWeAreComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'service', component: ServiceComponent},
  { path: 'mention-legales', component: MentionLegalesComponent},
  { path: 'confidentialite', component: ConfidentialiteComponent},
  { path: '**', component:HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
