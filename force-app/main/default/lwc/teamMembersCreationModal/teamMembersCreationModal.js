/* eslint-disable no-console */
import { LightningElement, track, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    'Team__c.Name'
];

export default class TeamMembersCreationModal extends LightningElement {
    @track showModal = false;
    @api recordId;

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS})
    team;

    get initParentName() {
        return this.team.data.fields.Name.value;
    }

    get initParentObject() {
        return {id: this.recordId, 
                sObjectType: 'Team__c', 
                icon: 'custom:custom5', 
                title: this.team.data.fields.Name.value};
    }
}

// todo: when clean team select, clear contact select by an event and make it disable
// todo: fix bug
// todo: make contacts field disable when team is empty 
// todo: make contacts field enable when team is selected
// when both field entered, enable save and close 
// when save and close enable, call apex to handle the dml
// enable cancel to send an event, reinit all 