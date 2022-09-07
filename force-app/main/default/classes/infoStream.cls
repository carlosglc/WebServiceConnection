public with sharing class infoStream {
    @AuraEnabled
    public static Map<String, Object> retrieveInfo(String dato){
        System.debug(dato);
        HttpRequest httpRequest = new HttpRequest();
        
        httpRequest.setEndPoint('https://newsapi.org/v2/everything?q='+dato+'&from=2022-09-02&sortBy=publishedAt&apiKey=98a2cc42097f45cba7f047786f53cfde');
        httpRequest.setMethod('GET');

        Map<String, Object> infoJsonData = new Map<String, Object>();
        String strResponse = null;

        try {

            Http http = new Http();
            HttpResponse httpResponse = http.send(httpRequest);

            if(httpResponse.getStatusCode() == 200){
                strResponse = httpResponse.getBody();
                System.debug(strResponse);
            }else{
                throw new CalloutException(httpResponse.getBody());
            }
            
        } catch (Exception ex) {
            throw ex;
        }

        if(!String.isBlank(strResponse)){
            infoJsonData = (Map<String,Object>)JSON.deserializeUntyped(strResponse);
        }
        if(!infoJsonData.isEmpty()){
            return infoJsonData;
        }else{
            return null;
        }
    }
}
