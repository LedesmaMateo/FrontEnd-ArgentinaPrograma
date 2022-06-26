import { Component, OnInit } from '@angular/core';
import { faAngleRight} from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { faInstagram , faGithub} from '@fortawesome/free-brands-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  text = 'Argentina Programa: #YoProgramo';
  faAngleR = faAngleRight;
  faInstagram = faInstagram;
  faGitHub = faGithub;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate([''])
  }

  showButton(route:string){
    return this.router.url === route;
  }

}
