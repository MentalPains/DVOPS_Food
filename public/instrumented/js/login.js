function cov_2joo5q6ptd(){var path="C:\\Users\\LENOVO\\Desktop\\DVOPS_Food\\public\\js\\login.js";var hash="17b01009c4e7a6b5e8829311e488c88cf9748c36";var global=new Function("return this")();var gcv="__coverage__";var coverageData={path:"C:\\Users\\LENOVO\\Desktop\\DVOPS_Food\\public\\js\\login.js",statementMap:{"0":{start:{line:2,column:19},end:{line:2,column:21}},"1":{start:{line:3,column:19},end:{line:3,column:31}},"2":{start:{line:4,column:4},end:{line:4,column:60}},"3":{start:{line:5,column:4},end:{line:5,column:66}},"4":{start:{line:6,column:4},end:{line:9,column:5}},"5":{start:{line:7,column:8},end:{line:7,column:80}},"6":{start:{line:8,column:8},end:{line:8,column:15}},"7":{start:{line:10,column:18},end:{line:10,column:38}},"8":{start:{line:11,column:4},end:{line:11,column:41}},"9":{start:{line:12,column:4},end:{line:12,column:65}},"10":{start:{line:13,column:4},end:{line:23,column:6}},"11":{start:{line:14,column:8},end:{line:14,column:52}},"12":{start:{line:15,column:8},end:{line:15,column:46}},"13":{start:{line:16,column:8},end:{line:22,column:9}},"14":{start:{line:17,column:12},end:{line:17,column:60}},"15":{start:{line:18,column:12},end:{line:18,column:47}},"16":{start:{line:21,column:12},end:{line:21,column:80}},"17":{start:{line:24,column:4},end:{line:24,column:43}}},fnMap:{"0":{name:"login",decl:{start:{line:1,column:9},end:{line:1,column:14}},loc:{start:{line:1,column:17},end:{line:25,column:1}},line:1},"1":{name:"(anonymous_1)",decl:{start:{line:13,column:21},end:{line:13,column:22}},loc:{start:{line:13,column:33},end:{line:23,column:5}},line:13}},branchMap:{"0":{loc:{start:{line:6,column:4},end:{line:9,column:5}},type:"if",locations:[{start:{line:6,column:4},end:{line:9,column:5}},{start:{line:6,column:4},end:{line:9,column:5}}],line:6},"1":{loc:{start:{line:6,column:8},end:{line:6,column:55}},type:"binary-expr",locations:[{start:{line:6,column:8},end:{line:6,column:28}},{start:{line:6,column:32},end:{line:6,column:55}}],line:6},"2":{loc:{start:{line:16,column:8},end:{line:22,column:9}},type:"if",locations:[{start:{line:16,column:8},end:{line:22,column:9}},{start:{line:16,column:8},end:{line:22,column:9}}],line:16}},s:{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0},f:{"0":0,"1":0},b:{"0":[0,0],"1":[0,0],"2":[0,0]},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"17b01009c4e7a6b5e8829311e488c88cf9748c36"};var coverage=global[gcv]||(global[gcv]={});if(!coverage[path]||coverage[path].hash!==hash){coverage[path]=coverageData;}var actualCoverage=coverage[path];{// @ts-ignore
cov_2joo5q6ptd=function(){return actualCoverage;};}return actualCoverage;}cov_2joo5q6ptd();function login(){cov_2joo5q6ptd().f[0]++;var response=(cov_2joo5q6ptd().s[0]++,"");var jsonData=(cov_2joo5q6ptd().s[1]++,new Object());cov_2joo5q6ptd().s[2]++;jsonData.email=document.getElementById("email").value;cov_2joo5q6ptd().s[3]++;jsonData.password=document.getElementById("password").value;cov_2joo5q6ptd().s[4]++;if((cov_2joo5q6ptd().b[1][0]++,jsonData.email=="")||(cov_2joo5q6ptd().b[1][1]++,jsonData.password=="")){cov_2joo5q6ptd().b[0][0]++;cov_2joo5q6ptd().s[5]++;document.getElementById("error").innerHTML='All fields are required!';cov_2joo5q6ptd().s[6]++;return;}else{cov_2joo5q6ptd().b[0][1]++;}var request=(cov_2joo5q6ptd().s[7]++,new XMLHttpRequest());cov_2joo5q6ptd().s[8]++;request.open("POST","/login",true);cov_2joo5q6ptd().s[9]++;request.setRequestHeader('Content-Type','application/json');cov_2joo5q6ptd().s[10]++;request.onload=function(){cov_2joo5q6ptd().f[1]++;cov_2joo5q6ptd().s[11]++;response=JSON.parse(request.responseText);cov_2joo5q6ptd().s[12]++;console.log(JSON.stringify(response));cov_2joo5q6ptd().s[13]++;if(response.message=="Login successful!"){cov_2joo5q6ptd().b[2][0]++;cov_2joo5q6ptd().s[14]++;sessionStorage.setItem("email",jsonData.email);cov_2joo5q6ptd().s[15]++;window.location.href='home.html';}else{cov_2joo5q6ptd().b[2][1]++;cov_2joo5q6ptd().s[16]++;document.getElementById("error").innerHTML='Invalid credentials!';}};cov_2joo5q6ptd().s[17]++;request.send(JSON.stringify(jsonData));}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMmpvbzVxNnB0ZCIsImFjdHVhbENvdmVyYWdlIiwibG9naW4iLCJmIiwicmVzcG9uc2UiLCJzIiwianNvbkRhdGEiLCJPYmplY3QiLCJlbWFpbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsInBhc3N3b3JkIiwiYiIsImlubmVySFRNTCIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25sb2FkIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0IiwiY29uc29sZSIsImxvZyIsInN0cmluZ2lmeSIsIm1lc3NhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsInNldEl0ZW0iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzZW5kIl0sInNvdXJjZXMiOlsibG9naW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gbG9naW4oKSB7XHJcbiAgICB2YXIgcmVzcG9uc2UgPSBcIlwiO1xyXG4gICAgdmFyIGpzb25EYXRhID0gbmV3IE9iamVjdCgpO1xyXG4gICAganNvbkRhdGEuZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpLnZhbHVlO1xyXG4gICAganNvbkRhdGEucGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpLnZhbHVlO1xyXG4gICAgaWYgKGpzb25EYXRhLmVtYWlsID09IFwiXCIgfHwganNvbkRhdGEucGFzc3dvcmQgPT0gXCJcIikge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3JcIikuaW5uZXJIVE1MID0gJ0FsbCBmaWVsZHMgYXJlIHJlcXVpcmVkISc7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgXCIvbG9naW5cIiwgdHJ1ZSk7XHJcbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLm1lc3NhZ2UgPT0gXCJMb2dpbiBzdWNjZXNzZnVsIVwiKSB7XHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJlbWFpbFwiLCBqc29uRGF0YS5lbWFpbCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2hvbWUuaHRtbCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yXCIpLmlubmVySFRNTCA9ICdJbnZhbGlkIGNyZWRlbnRpYWxzISc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJlcXVlc3Quc2VuZChKU09OLnN0cmluZ2lmeShqc29uRGF0YSkpO1xyXG59Il0sIm1hcHBpbmdzIjoiNmlGQWVZO0FBQUFBLGNBQUEsU0FBQUEsQ0FBQSxTQUFBQyxjQUFBLFdBQUFBLGNBQUEsRUFBQUQsY0FBQSxHQWZaLFFBQVMsQ0FBQUUsS0FBS0EsQ0FBQSxDQUFHLENBQUFGLGNBQUEsR0FBQUcsQ0FBQSxNQUNiLEdBQUksQ0FBQUMsUUFBUSxFQUFBSixjQUFBLEdBQUFLLENBQUEsTUFBRyxFQUFFLEVBQ2pCLEdBQUksQ0FBQUMsUUFBUSxFQUFBTixjQUFBLEdBQUFLLENBQUEsTUFBRyxHQUFJLENBQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUNQLGNBQUEsR0FBQUssQ0FBQSxNQUM1QkMsUUFBUSxDQUFDRSxLQUFLLENBQUdDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDQyxLQUFLLENBQUNYLGNBQUEsR0FBQUssQ0FBQSxNQUN4REMsUUFBUSxDQUFDTSxRQUFRLENBQUdILFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDQyxLQUFLLENBQUNYLGNBQUEsR0FBQUssQ0FBQSxNQUM5RCxHQUFJLENBQUFMLGNBQUEsR0FBQWEsQ0FBQSxTQUFBUCxRQUFRLENBQUNFLEtBQUssRUFBSSxFQUFFLElBQUFSLGNBQUEsR0FBQWEsQ0FBQSxTQUFJUCxRQUFRLENBQUNNLFFBQVEsRUFBSSxFQUFFLEVBQUUsQ0FBQVosY0FBQSxHQUFBYSxDQUFBLFNBQUFiLGNBQUEsR0FBQUssQ0FBQSxNQUNqREksUUFBUSxDQUFDQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUNJLFNBQVMsQ0FBRywwQkFBMEIsQ0FBQ2QsY0FBQSxHQUFBSyxDQUFBLE1BQ3hFLE9BQ0osQ0FBQyxLQUFBTCxjQUFBLEdBQUFhLENBQUEsVUFDRCxHQUFJLENBQUFFLE9BQU8sRUFBQWYsY0FBQSxHQUFBSyxDQUFBLE1BQUcsR0FBSSxDQUFBVyxjQUFjLENBQUMsQ0FBQyxFQUFDaEIsY0FBQSxHQUFBSyxDQUFBLE1BQ25DVSxPQUFPLENBQUNFLElBQUksQ0FBQyxNQUFNLENBQUUsUUFBUSxDQUFFLElBQUksQ0FBQyxDQUFDakIsY0FBQSxHQUFBSyxDQUFBLE1BQ3JDVSxPQUFPLENBQUNHLGdCQUFnQixDQUFDLGNBQWMsQ0FBRSxrQkFBa0IsQ0FBQyxDQUFDbEIsY0FBQSxHQUFBSyxDQUFBLE9BQzdEVSxPQUFPLENBQUNJLE1BQU0sQ0FBRyxVQUFZLENBQUFuQixjQUFBLEdBQUFHLENBQUEsTUFBQUgsY0FBQSxHQUFBSyxDQUFBLE9BQ3pCRCxRQUFRLENBQUdnQixJQUFJLENBQUNDLEtBQUssQ0FBQ04sT0FBTyxDQUFDTyxZQUFZLENBQUMsQ0FBQ3RCLGNBQUEsR0FBQUssQ0FBQSxPQUM1Q2tCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSixJQUFJLENBQUNLLFNBQVMsQ0FBQ3JCLFFBQVEsQ0FBQyxDQUFDLENBQUNKLGNBQUEsR0FBQUssQ0FBQSxPQUN0QyxHQUFJRCxRQUFRLENBQUNzQixPQUFPLEVBQUksbUJBQW1CLENBQUUsQ0FBQTFCLGNBQUEsR0FBQWEsQ0FBQSxTQUFBYixjQUFBLEdBQUFLLENBQUEsT0FDekNzQixjQUFjLENBQUNDLE9BQU8sQ0FBQyxPQUFPLENBQUV0QixRQUFRLENBQUNFLEtBQUssQ0FBQyxDQUFDUixjQUFBLEdBQUFLLENBQUEsT0FDaER3QixNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxDQUFHLFdBQVcsQ0FDdEMsQ0FBQyxJQUNJLENBQUEvQixjQUFBLEdBQUFhLENBQUEsU0FBQWIsY0FBQSxHQUFBSyxDQUFBLE9BQ0RJLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDSSxTQUFTLENBQUcsc0JBQXNCLENBQ3ZFLENBQ0osQ0FBQyxDQUFDZCxjQUFBLEdBQUFLLENBQUEsT0FDRlUsT0FBTyxDQUFDaUIsSUFBSSxDQUFDWixJQUFJLENBQUNLLFNBQVMsQ0FBQ25CLFFBQVEsQ0FBQyxDQUFDLENBQzFDIn0=