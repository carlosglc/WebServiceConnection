import { LightningElement, track } from 'lwc';
import retrieveInfo from "@salesforce/apex/infoStream.retrieveInfo";
export default class HelloWorld extends LightningElement {

    @track result = [];
    @track selectedNews = {};
    @track isModalOpen = false;

    datoBusqueda='';
    thereIsData=false;

    captureData(event){
        this.datoBusqueda=event.detail.value;
        console.log(this.datoBusqueda);
    }

    get modalClass(){
        return `slds-modal ${this.isModalOpen ? "slds-fade-in-open" : ""}`
    }

    get modalBackdropClass(){
        this.isModalOpen ? "slds-backdrop slds-backdrop_open" : "slds-backdrop"
    }


    fetchInfo(){
        retrieveInfo({dato: this.datoBusqueda}).then(response=>{
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