/* MASAR HOTEL 6.03 GitHub Pages demonstration only. Not server authentication. */
(()=>{
 const SESSION='masar603_demo_session', DATA='masar603_demo_data';
 const fresh=()=>({settings:{hotel:'مسار هوتل',hotelLogo:'clogo.png'},rooms:[{id:101,no:'101',type:'عادية',status:'متاحة',floor:1,price:850},{id:102,no:'102',type:'مميزة',status:'مشغولة',floor:1,price:1200},{id:201,no:'201',type:'جناح',status:'متاحة',floor:2,price:1900}],guests:[],bookings:[],tasks:[],payments:[],services:[],items:[],expenses:[],users:[{id:1,name:'مدير العرض',username:'demo',role:'مدير النظام'}],restaurantOrders:[],auditLogs:[],waitlist:[],roles:[{name:'مدير النظام'}],floorSettings:[]});
 const read=()=>{try{return JSON.parse(localStorage.getItem(DATA))||fresh()}catch{return fresh()}};
 const identity=()=>{window.masarServerIdentity={name:'مدير العرض',role:'admin',mustChangePassword:false}};
 window.masarServerIdentity=null;
 window.masarDesktop={
  async loadDB(){if(localStorage.getItem(SESSION)!=='yes')throw Error('LOGIN_REQUIRED');identity();return read()},
  async employeeLogin(u,p){if(u!=='demo'||p!=='demo603')throw Error('بيانات الدخول الاستعراضية غير صحيحة');localStorage.setItem(SESSION,'yes');identity();return read()},
  async logoutServer(){localStorage.removeItem(SESSION);window.masarServerIdentity=null;return {ok:true}},
  async saveDB(data){localStorage.setItem(DATA,JSON.stringify(data));return {ok:true}},
  async manageCategory(operation,category,name,new_name){let d=read();d.settings=d.settings||{};let cats=d.settings.guestCategories||['مدني','عسكري','بوكينج'];if(operation==='add_category'&&!cats.includes(category))cats.push(category);if(operation==='delete_category')cats=cats.filter(x=>x!==category);if(operation==='rename_category')cats=cats.map(x=>x===category?new_name:x);d.settings.guestCategories=cats;localStorage.setItem(DATA,JSON.stringify(d));return {data:d}},
  async changePassword(){throw Error('كلمة مرور العرض ثابتة')},async addStaff(){throw Error('إضافة موظفين حقيقيين غير متاحة في العرض')},
  async getDataLocation(){return 'بيانات استعراضية محلية في المتصفح (ليست MySQL)'},async openDataFolder(){alert('هذه نسخة استعراضية تعمل في المتصفح فقط')},
  async saveLogo(data){let d=read();d.settings=d.settings||{};d.settings.hotelLogo=data;localStorage.setItem(DATA,JSON.stringify(d));return {ok:true}},
  async exportBackup(){throw Error('النسخ الاحتياطي للسيرفر غير متاح في العرض')},async importBackup(){throw Error('غير متاح في العرض')}
 };
})();