import { LightningElement, track } from 'lwc';
import retrieveInfo from "@salesforce/apex/infoStream.retrieveInfo";
export default class HelloWorld extends LightningElement {

    @track result = [];
    @track selectedNews = {};
    @track isModalOpen = false;

    keyword='';
    lang='';
    sortBy='';
    thereIsData=false;

    captureKeyword(event){
        this.keyword=event.detail.value;
        console.log(this.keyword);
    }

    captureLanguage(event){
        this.lang=event.detail.value;
    }

    captureSortingPreference(event){
        this.sortBy=event.detail.value;
    }

    get modalClass(){
        return `slds-modal ${this.isModalOpen ? "slds-fade-in-open" : ""}`
    }

    get modalBackdropClass(){
        this.isModalOpen ? "slds-backdrop slds-backdrop_open" : "slds-backdrop"
    }


    fetchInfo(){
        retrieveInfo({keyword: this.keyword, lang: this.lang, sortBy: this.sortBy}).then(response=>{
            console.log(response);
            this.formatNewsData(response.articles)
        }).catch(error=>{
            console.error(error);
        })
    }

    formatNewsData(res){
        this.result = res.map((item,index)=>{
            this.thereIsData=true;
            let id = `new_${index+1}`;
            let date = new Date(item.publishedAt).toDateString();
            let name = item.source.name;
            return {...item, id:id, name:name, date: date}
        });
    }

    
    showModal(event){
        let id = event.target.dataset.item;
        this.result.forEach(item=>{
            if(item.id === id){
                this.selectedNews = {...item}
            }
        })

        this.isModalOpen = true;

    }

    closeModal(){
        this.isModalOpen = false;
    }
}
