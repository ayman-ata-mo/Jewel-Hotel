/* Static browser-only demonstration. NO PHP, MySQL, or real authentication. */
(()=>{
 const key='MASAR_602_DEMO_DATA_V1';
 const sample=()=>({settings:{hotel:'فندق جويل — نسخة استعراضية',guestCategories:['مدني','عسكري','بوكينج'],breakfastPrice:80,lunchPrice:150,dinnerPrice:130},rooms:[{no:'101',type:'مفردة',floor:1,price:650,status:'متاحة'},{no:'102',type:'مزدوجة',floor:1,price:900,status:'متاحة'},{no:'103',type:'ثلاثية',floor:1,price:1200,status:'متاحة'},{no:'201',type:'مزدوجة',floor:2,price:950,status:'متاحة'},{no:'202',type:'جناح',floor:2,price:1800,status:'متاحة'},{no:'203',type:'عائلية',floor:2,price:1500,status:'متاحة'}],guests:[],bookings:[],tasks:[],payments:[],services:[],items:[],expenses:[],users:[],restaurantOrders:[],auditLogs:[],waitlist:[],floorSettings:[]});
 const read=()=>{try{return JSON.parse(localStorage.getItem(key))||sample()}catch{return sample()}};
 let logged=false;window.masarServerIdentity=null;
 window.masarDesktop={
  async loadDB(){if(!logged)throw Error('DEMO_NOT_LOGGED_IN');return read()},
  async employeeLogin(u,p){if(u!=='demo'||p!=='demo2026')throw Error('بيانات الدخول التجريبية غير صحيحة');logged=true;window.masarServerIdentity={name:'مستخدم تجريبي',role:'admin',mustChangePassword:false};return read()},
  async logoutServer(){logged=false;window.masarServerIdentity=null;return {ok:true}},
  async saveDB(data){if(!logged)throw Error('يرجى تسجيل الدخول');localStorage.setItem(key,JSON.stringify(data));return {ok:true}},
  async manageCategory(operation,category,name='',new_name=''){const d=read();d.settings=d.settings||{};const a=d.settings.guestCategories||['مدني','عسكري','بوكينج'];if(operation==='add_category'&&!a.includes(category))a.push(category);if(operation==='delete_category')d.settings.guestCategories=a.filter(x=>x!==category);else d.settings.guestCategories=a;localStorage.setItem(key,JSON.stringify(d));return d},
  async saveLogo(data){const d=read();d.settings=d.settings||{};d.settings.hotelLogo=data;localStorage.setItem(key,JSON.stringify(d));return {ok:true}},
  async getDataLocation(){return 'نسخة استعراضية: التخزين في هذا المتصفح فقط'},
  async openDataFolder(){alert('النسخة الاستعراضية لا تتصل بقاعدة بيانات')},
  async changePassword(){throw Error('غير متاح في النسخة الاستعراضية')},
  async addStaff(){throw Error('غير متاح في النسخة الاستعراضية')},
  async importBackup(){throw Error('غير متاح في النسخة الاستعراضية')},
  async exportBackup(){throw Error('غير متاح في النسخة الاستعراضية')}
 };
 window.masarDemoReset=()=>{localStorage.removeItem(key);location.reload()};
})();
