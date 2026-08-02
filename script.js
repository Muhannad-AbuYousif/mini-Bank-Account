
let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
console.log(accounts);

let currentid = accounts.length > 0
? accounts[accounts.length - 1].id + 1
: 1;
console.log(currentid);

let currentAccount = null;

const savedId = localStorage.getItem('currentAccountId');

if (savedId) {
  currentAccount = accounts.find(acc => acc.id === +savedId);
}





const createbtn = document.querySelector('.create-btn')
const modal = document.querySelector('.modal')
const project = document.querySelector('.project')
const back = document.querySelector('.back-btn')
const submitbtn = document.querySelector('.submit-btn')
const fullname = document.querySelector('.full-name')
const emailaddress = document.querySelector('.email-address')
const password = document.querySelector('.password')
const initialbalance = document.querySelector('.initial-balance')
const accountParent = document.querySelector('.accounts')
const account = document.querySelector('.account')
const errorBox = document.querySelector('.error-box')
const  closeError= document.querySelector('.close-error')
const errorBtn = document.querySelector('.error-btn')
const cancelBtn = document.querySelector('.cancel-btn')
const passwordmodal = document.querySelector('.password-modal')
const currentAccountEl = document.querySelector('.current-account')
const AccountNameEl  = document.querySelector('.AccountNameEl ')
const balanceValueEl =  document.querySelector('.balance-Value')
const passwordmodalEl = document.querySelector('.password-modal')
const passwordinputEl = document.querySelector('.password-input')
const loginBtnEl = document.querySelector('.login-btn')
const passwordeErrorEl = document.querySelector('.password-error')
const passwordErrorBtn = document.querySelector('.password-error-btn')
const accountExistsError =document.querySelector('.account-exists-error ')
const accountExistsBtn = document.querySelector('.account-exists-btn')
const depositBtn = document.querySelector('.deposit-btn')
const amountInputEl = document.querySelector('.amount-input')
const withdrawBtn =  document.querySelector('.withdraw-btn')
const transactionErrorEl = document.querySelector('.transaction-error')
const transactionErrorBtnEl = document.querySelector('.transaction-error-btn')
const transactionsEl = document.querySelector('.transactions')
const deleteModal = document.querySelector('.delete-modal')
const cancelDeleteBtn = document.querySelector('.cancel-delete')
const confirmDeleteBtn= document.querySelector('.confirm-delete')
const deletePasswordInput = document.querySelector('.delete-password')




//Render accounts in Sidebar 
const RendrAccounts = function(){
  accountParent.innerHTML=''
  accounts.forEach(account=>{
    const accountHtml = `
    
    <div class="account"  data-id="${account.id}">
        
            <span>${account.FullName}</span>
        
            <button class="delete-btn">
              Delete
            </button>
        
          </div>
    
    `
    accountParent.insertAdjacentHTML("afterbegin",accountHtml)

  })
}

RendrAccounts();

// Save Accounts in localStorage
const saveAccounts = function(){
  localStorage.setItem('accounts', JSON.stringify(accounts));
  RendrAccounts()
};





// Update Account Name
const UpdateAccountName = function(account){
 
  AccountNameEl.textContent = account.FullName

}

// Update Balance 
const UpdateBalance = function(account){
  balanceValueEl.textContent = `${account.balance}$`;




}


//Controle Errors
const RnderError = function(){
  errorBox.classList.toggle('hidden')
}
const RenderErrorAccountExists= function(){
  accountExistsError.classList.toggle('hidden')
}
closeError.addEventListener('click',function(){
  errorBox.classList.toggle('hidden')
})
errorBtn.addEventListener('click',function(){
  errorBox.classList.toggle('hidden')
})
cancelBtn.addEventListener('click',function(){
  passwordmodal.classList.toggle('hidden')
})
passwordErrorBtn.addEventListener('click',function(){
  passwordeErrorEl.classList.toggle('hidden')
})
accountExistsBtn.addEventListener('click',function(){
  accountExistsError.classList.toggle('hidden')
})
cancelDeleteBtn.addEventListener('click',function(){
  deleteModal.classList.toggle('hidden')

})


// updateTransaction
const UpdateDepositTransactionsUi= function(amount){
  const DepositTransationHtml= ` <div class="transaction">
          <span class="deposit-transaction">+${amount} Deposit</span>
          <span>today</span>
        </div>`
        transactionsEl.insertAdjacentHTML("afterbegin",DepositTransationHtml)

}


const UpdateWithdrawTransactions = function(amount){
  const WithdrrawTransactionHtml  =` <div class="transaction">
          <span class="withdraw-transaction">${amount} Withdraw</span>
          <span>today</span>
        </div>`

        transactionsEl.insertAdjacentHTML("afterbegin",WithdrrawTransactionHtml)
}



const updateTransactions = function(){
  transactionsEl.innerHTML=''
  currentAccount.transactions.forEach(transact=>{
    if(transact>0){
      UpdateDepositTransactionsUi(transact)
    }else{
      UpdateWithdrawTransactions(transact)
    }
   
  })
}






const transactionError = function(){
  transactionErrorEl.classList.toggle('hidden')

}
transactionErrorBtnEl.addEventListener('click',function(){
  transactionErrorEl.classList.toggle('hidden')
})



// control accounts

accountParent.addEventListener('click', function(e){
  //DELETE ACCOUNT
  if(e.target.classList.contains('delete-btn')){
    deleteModal.classList.toggle('hidden')
    const targetDelete= e.target.closest('.account');
    const targetDeleteId = + targetDelete.dataset.id
    console.log(targetDeleteId);

    confirmDeleteBtn.addEventListener('click',function(){

        const foundAccount = accounts.find(
          acc => acc.id === targetDeleteId
        );
      
        if(!foundAccount) return;
      
      
        currentAccount = foundAccount;
        if(deletePasswordInput.value === currentAccount.Password ){
          accounts = accounts.filter(account=>{
            return   account.id!==targetDeleteId
            })
            deleteModal.classList.toggle('hidden')
           
            saveAccounts ()


            if (currentAccount && currentAccount.id === targetDeleteId) {
              currentAccount = null;
              AccountNameEl.textContent = 'Select account';
              balanceValueEl.textContent = '0$';
              transactionsEl.innerHTML = '';
              localStorage.removeItem('currentAccountId');
            }
        


        }else{
          passwordeErrorEl.classList.remove('hidden')
         
        }

    })




  }else{
    const target = e.target.closest('.account');
  if(!target) return;
console.log(target);
  const targetId = Number(target.dataset.id);
   console.log(targetId);

  const foundAccount = accounts.find(
    acc => acc.id === targetId
  );

  if(!foundAccount) return;
  console.log(foundAccount);

  currentAccount = foundAccount; 

 


  localStorage.setItem('currentAccountId', currentAccount.id);

  passwordmodalEl.classList.remove('hidden');


  }

  
});
 
loginBtnEl.addEventListener('click',function(){
  if(!currentAccount){
    console.log('No account selected');
    return;
  }
console.log(currentAccount);
  if(passwordinputEl.value.trim()==currentAccount.Password){
    UpdateAccountName(currentAccount)
    UpdateBalance(currentAccount)
    passwordmodalEl.classList.toggle('hidden')
    passwordinputEl.value=''
    if(currentAccount.transactions.length == 0){
      console.log('noo trans');
    }
   

  }else{
    passwordeErrorEl.classList.remove('hidden')
  }
})



createbtn.addEventListener('click',function(){
  modal.classList.toggle('hidden')
  project.classList.toggle('pageblure')

})
back.addEventListener('click',function(){
  modal.classList.toggle('hidden')
  project.classList.toggle('pageblure')
})

// creat Account
submitbtn.addEventListener('click',function(e){
  e.preventDefault()

  // check Data validation
  if(fullname.value!==''
    || emailaddress.value!==''
    ||password.value!==''
    ||initialbalance.value!==''){
      if(initialbalance.value>0){
      
        if(!accounts.some(account=>account.Password === password.value) 
          && !accounts.some(account=>account.EmailAddress === emailaddress.value )){
        

            const account = {
              id:currentid++,
              FullName: fullname.value,
              EmailAddress:emailaddress.value,
              Password:password.value,
              balance:+initialbalance.value,
              transactions:[],
               }
             accounts.push(account)
             saveAccounts();
           
             console.log(accounts);
  


          
         
        }else{
          RenderErrorAccountExists()
        }


      }else{
        RnderError()
      }
    


  }else{
    RnderError()
  }
  RendrAccounts()

 modal.classList.toggle('hidden')
  project.classList.toggle('pageblure')

  fullname.value=''
  emailaddress.value=''
  password.value=''
  initialbalance.value=''

})
// control deposit & withdraw

depositBtn.addEventListener('click',function(){
  const amount = +amountInputEl.value
 if(amount>0 && amount!==''){
   const newBalance=currentAccount.balance+=amount
   currentAccount.balance  = newBalance
  
   UpdateBalance(currentAccount)
  console.log(newBalance);
  currentAccount.transactions.push(amount)
  saveAccounts();
  console.log(currentAccount);
  updateTransactions()
 }else{
  transactionError()
 }

})
withdrawBtn.addEventListener('click',function(){
  const amount = +amountInputEl.value
  if(amount<=currentAccount.balance && amount>0 ){
    const newBalance = currentAccount.balance-=amount
    currentAccount.balance =newBalance
    console.log(newBalance);
    currentAccount.transactions.push(-amount)
    saveAccounts();
    console.log(currentAccount);
    UpdateBalance(currentAccount)
    updateTransactions()
  }else{
    transactionError()

 
  }

  
})

RendrAccounts();

if (currentAccount) {
  UpdateAccountName(currentAccount);
  UpdateBalance(currentAccount);
  updateTransactions(); // 👈 هذا هو المهم
} else {
  AccountNameEl.textContent = 'Select account';
  balanceValueEl.textContent = '0$';
  transactionsEl.innerHTML = '';
}






