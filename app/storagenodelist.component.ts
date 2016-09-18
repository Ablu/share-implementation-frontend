import {Component, ViewChild, ElementRef} from '@angular/core';
import {ShareService} from "./share.service";
import setInterval = core.setInterval;

@Component({
    selector: 'storage-node-list',
    providers: [ShareService],
    styles: [`
    interval {
        width: 100%;
    }
`],
    template: `
    <div *ngFor="let storageNode of storageNodes">
        <storage-node [storageNode]="storageNode"></storage-node>
    </div>
    
    <input type="submit" value="Add Storage Node" (click)="createStorageNode()"/>
`,
})
export class StorageNodeListComponent {
    private storageNodes = [];

    constructor(private shareService: ShareService) {
        shareService.storageNodeAddedSource$.subscribe(storageNode => {
            this.storageNodes.push(storageNode);
        });
        shareService.storageNodeUpdatedSource$.subscribe(storageNode => {
            for (let i = 0; i < this.storageNodes.length; ++i) {
                if (this.storageNodes[i].id == storageNode.id) {
                    this.storageNodes[i] = storageNode;
                    break;
                }
            }
        });
        shareService.storageNodeDeletedSource$.subscribe(storageNode => {
            for (let i = 0; i < this.storageNodes.length; ++i) {
                if (this.storageNodes[i].id == storageNode.id) {
                    this.storageNodes.splice(i, 1);
                    break;
                }
            }
        });
    }

    private createStorageNode() {
        this.shareService.addStorageNode();
    }
}
