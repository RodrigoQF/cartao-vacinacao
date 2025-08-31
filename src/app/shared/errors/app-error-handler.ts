import { ErrorHandler, Injectable } from "@angular/core";
import { LoaderService } from "../../service/loader.service";
import { Router } from "@angular/router";
import { Store } from "../utils/util.store";

@Injectable()
export class AppErrorHandler implements ErrorHandler{

    constructor(private loaderService: LoaderService, private router: Router, private store: Store){

    }
    handleError(error: any): void {
        this.store.set("erroAplicacao", true);
        this.loaderService.hide();
        this.router.navigate(['pagina-erro'])
    }

}