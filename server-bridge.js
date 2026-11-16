/* Jewel Hotel GitHub Pages demo: browser-only, no PHP or central database. */
(()=>{const KEY='jewel_hotel_demo_60303_data',AUTH='jewel_hotel_demo_60303_auth';let revision=0;
const clone=x=>JSON.parse(JSON.stringify(x));
async function seed(){const r=await fetch('demo-data.json',{cache:'no-store'});if(!r.ok)throw Error('تعذر تحميل بيانات التجربة');return r.json()}
async function load(){const raw=localStorage.getItem(KEY);if(raw){try{return JSON.parse(raw)}catch{}}const d=await seed();localStorage.setItem(KEY,JSON.stringify(d));return d}
const identity=()=>{window.masarServerIdentity={name:'مدير النسخة التجريبية',role:'admin',mustChangePassword:false}};
window.masarDesktop={
async loadDB(){if(sessionStorage.getItem(AUTH)!=='1')throw Error('LOGIN_REQUIRED');identity();return load()},
async employeeLogin(u,p){if(u!=='demo'||p!=='demo')throw Error('اسم المستخدم أو كلمة المرور غير صحيحة');sessionStorage.setItem(AUTH,'1');identity();return load()},
async logoutServer(){sessionStorage.removeItem(AUTH);window.masarServerIdentity=null;return {ok:true}},
async saveDB(d){if(sessionStorage.getItem(AUTH)!=='1')throw Error('LOGIN_REQUIRED');localStorage.setItem(KEY,JSON.stringify(d));revision++;return {ok:true,engine:'Browser localStorage (demo)',revision}},
async manageCategory(op,cat,name,newName){const d=await load(),s=d.settings||(d.settings={}),a=s.guestCategories||(s.guestCategories=['مدني','عسكري','بوكينج','تصنيفات أخرى']),groups=s.guestSubcategories||(s.guestSubcategories={});if(op==='add_category'&&!a.includes(cat))a.push(cat);if(op==='delete_category'){s.guestCategories=a.filter(x=>x!==cat);delete groups[cat]}if(op==='rename_category'){s.guestCategories=a.map(x=>x===cat?newName:x);groups[newName]=groups[cat]||[];delete groups[cat]}if(op==='add_sub'){groups[cat]=groups[cat]||[];if(!groups[cat].includes(name))groups[cat].push(name)}if(op==='delete_sub')groups[cat]=(groups[cat]||[]).filter(x=>x!==name);if(op==='rename_sub')groups[cat]=(groups[cat]||[]).map(x=>x===name?newName:x);localStorage.setItem(KEY,JSON.stringify(d));return d},
async changePassword(){throw Error('كلمة مرور النسخة التجريبية ثابتة: demo')},
async addStaff(){throw Error('إضافة مستخدمين فعليين غير متاحة في نسخة العرض')},
async saveLogo(data){const d=await load();d.settings.hotelLogo=data;localStorage.setItem(KEY,JSON.stringify(d));return {ok:true}},
async getDataLocation(){return 'بيانات تجريبية داخل هذا المتصفح فقط'},async openDataFolder(){alert('هذه نسخة عرض: البيانات محفوظة محليًا داخل المتصفح')},
async exportBackup(payload){const blob=new Blob([JSON.stringify({format:'JEWEL-DEMO-1',data:payload.data},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='JEWEL_DEMO_BACKUP.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);return {ok:true}},
async importBackup(){throw Error('استيراد النسخ غير متاح في نسخة العرض')}
};
window.jewelDemoReset=async()=>{localStorage.removeItem(KEY);location.reload()};
})();