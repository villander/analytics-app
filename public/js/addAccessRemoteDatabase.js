/**
 * JavaScript que, qnd se muda de pagina, envia ao servidor de Relatorios os
 * dados: url, ip e dateTime
 * @type Date
 */

var date = new Date();
var strDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
var currentUrl = window.location.href;
var xhttp = new XMLHttpRequest();
var params = 'comando=acessoURL&url=' + currentUrl + '&ip=1234&dateTime=' + strDate;
xhttp.open("POST", "http://localhost:9090/saasAnalytics/AdminServlet.saas", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send(params);