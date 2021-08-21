import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import { OurPackageComponent } from './our-package/our-package.component';
import { PodcastComponent } from './podcast/podcast.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BlogComponent } from './blog/blog.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ClientSpaceComponent } from './client-space/client-space.component';
import { UploadDataComponent } from './upload-data/upload-data.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { ProjectComponent } from './project/project.component';
import { ResultComponent } from './result/result.component';
import { AngularD3CloudModule } from 'angular-d3-cloud'
import {MatExpansionModule} from '@angular/material/expansion';
import { AddClassComponent } from './add-class/add-class.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule} from '@angular/forms';
import { ProjectDetailsModalComponent } from './project-details-modal/project-details-modal.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UploadFileModalComponent } from './modals/upload-file-modal/upload-file-modal.component';
import { SocialMediaApiModalComponent } from './modals/social-media-api-modal/social-media-api-modal.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CreatePrjectModalComponent } from './modals/create-prject-modal/create-prject-modal.component';
import { ValidateDataModalComponent } from './modals/validate-data-modal/validate-data-modal.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { AutoDataSendModalComponent } from './modals/auto-data-send-modal/auto-data-send-modal.component';
import { AllCommentsSentimentAnalyseComponent } from './result/all-comments-sentiment-analyse/all-comments-sentiment-analyse.component';
import { AllCommentsClassificationComponent } from './result/all-comments-classification/all-comments-classification.component';
import { WordCloudComponent } from './result/word-cloud/word-cloud.component';
import { TwoWordCompModalComponent } from './modals/two-word-comp-modal/two-word-comp-modal.component';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AngularSplitModule } from 'angular-split';
import { NinjaSplitterModule } from 'ninja-splitter';
import { CommonModule } from '@angular/common';
import { MentionSpaceComponent } from './mention-space/mention-space.component';  
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FbTipsModalComponent } from './modals/fb-tips-modal/fb-tips-modal.component';
import { ServiceComponent } from './service/service.component';
import { ConfidentialiteComponent } from './confidentialite/confidentialite.component';
import { MentionLegalesComponent } from './mention-legales/mention-legales.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WhatWeDoComponent,
    OurPackageComponent,
    PodcastComponent,
    ContactUsComponent,
    BlogComponent,
    WhoWeAreComponent,
    AdminComponent,
    ClientSpaceComponent,
    UploadDataComponent,
    ProjectComponent,
    ResultComponent,
    AddClassComponent,
    FooterComponent,
    NavbarComponent,
    SigninComponent,
    SignupComponent,
    ProjectDetailsModalComponent,
    UploadFileModalComponent,
    SocialMediaApiModalComponent,
    CreatePrjectModalComponent,
    ValidateDataModalComponent,
    AutoDataSendModalComponent,
    AllCommentsSentimentAnalyseComponent,
    AllCommentsClassificationComponent,
    WordCloudComponent,
    TwoWordCompModalComponent,
    MentionSpaceComponent,
    FbTipsModalComponent,

    ServiceComponent,
     ConfidentialiteComponent,
     MentionLegalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    //MDBBootstrapModule.forRoot(),
    ChartsModule,
    AngularD3CloudModule,
    MatExpansionModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTooltipModule,
    CdkStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule,
    CommonModule,
    NgxStarRatingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
