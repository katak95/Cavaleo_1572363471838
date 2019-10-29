/* 
* Generated by
* 
*      _____ _          __  __      _     _
*     / ____| |        / _|/ _|    | |   | |
*    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
*     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
*     ____) |   < (_| | | | || (_) | | (_| |  __/ |
*    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
*
* The code generator that works in many programming languages
*
*			https://www.skaffolder.com
*
*
* You can generate the code from the command-line
*       https://npmjs.com/package/skaffolder-cli
*
*       npm install -g skaffodler-cli
*
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
*
* To remove this comment please upgrade your plan here: 
*      https://app.skaffolder.com/#!/upgrade
*
* Or get up to 70% discount sharing your unique link:
*       https://app.skaffolder.com/#!/register?friend=5db85c14bcbe47264d82335d
*
* You will get 10% discount for each one of your friends
* 
*/
// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { HorseService } from '../../services/horse.service';
import { UserService } from '../../services/user.service';
// Import Models
import { Horse } from '../../domain/cavaleo_db/horse';
import { User } from '../../domain/cavaleo_db/user';

// START - USED SERVICES
/**
* HorseService.create
*	@description CRUD ACTION create
*
* HorseService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* UserService.list
*	@description CRUD ACTION list
*
* HorseService.update
*	@description CRUD ACTION update
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Horse
 */
@Component({
    selector: 'app-horse-edit',
    templateUrl: 'horse-edit.component.html',
    styleUrls: ['horse-edit.component.css']
})
export class HorseEditComponent implements OnInit {
    item: Horse;
    listOwner: User[];
    model: Horse;
    formValid: Boolean;

    constructor(
    private horseService: HorseService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Horse();
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.horseService.get(id).subscribe(item => this.item = item);
            }
            // Get relations
            this.userService.list().subscribe(list => this.listOwner = list);
        });
    }


    /**
     * Save Horse
     *
     * @param {boolean} formValid Form validity check
     * @param Horse item Horse to save
     */
    save(formValid: boolean, item: Horse): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.horseService.update(item).subscribe(data => this.goBack());
            } else {
                this.horseService.create(item).subscribe(data => this.goBack());
            } 
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }


}



