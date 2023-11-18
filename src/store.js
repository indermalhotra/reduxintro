import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialState ={
    balance:0,
    loan:0,
    loanPurpose: "",
    isLoading: false
}

const initialStateCustomer={
    fullName:"",
    nationalID:"",
    createdAt:""
}

const accountSlice = createSlice({
    name:"account",
    initialState,
    reducers:{
        deposit(state, action){
            state.balance = state.balance + action.payload; 
        },
        withdraw(state,action){
            state.balance = state.balance - action.payload;
        },
        requestLoan(state,action){
            if(state.loan > 0) return;
            state.loan = action.payload.amount;
            state.loanPurpose = action.payload.purpose;
            state.balance = state.balance + action.payload.amount;
        },
        payLoan(state){         
            state.balance = state.balance - state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        }
    }
})

const customerSlice = createSlice({
    name:"customer",
    initialState:initialStateCustomer,
    reducers:{
        createUser(state, action){
            state.fullName = action.payload.fullName;
            state.nationalID = action.payload.nationalId
            state.createdAt = new Date().toISOString();
        }
    }
})

const accountReducer = accountSlice.reducer;
const customerReducer = customerSlice.reducer;

const store = configureStore({
    reducer:{
       account: accountReducer,
       customer:customerReducer, 
    }}
);

export const accountAction = accountSlice.actions;
export const customerAction = customerSlice.actions;

export default store;