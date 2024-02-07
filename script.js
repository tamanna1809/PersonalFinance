let skull = document.querySelector('.right svg');
let task = document.querySelector('.spenditure');

let addtask = true;

skull.addEventListener('click', function(){
    if(addtask){
        task.style.display = 'flex'; //show task box
    }
    else{
        task.style.display = 'none'; //hide task box
    }
    addtask = !addtask;
});

let expenses = [];
let total = 0;
const category = document.getElementById('category');
const amount = document.getElementById('amount');
const date = document.getElementById('date');
const descrip = document.getElementById('Description');
const addbtn = document.getElementById('addbtn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmount = document.getElementById('total-amount');

// Rest of your JavaScript code here

let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['FOOD', 'RENT', 'TRANSPORT', 'LUXRIES'],
        datasets: [{
            data: [0,0,0,0],
            backgroundColor: [
                'red',
                'blue',
                'yellow',
                'pink',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
    
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
    }
});
addbtn.addEventListener('click', function(){
    const cat= category.value;
    const amt= Number(amount.value);
    const dates= date.value;
    const des = descrip.value;
    console.log(cat);
    console.log(amt);
    console.log(dates);
    console.log(des);



    if (cat === '') {
        alert('Kindly select a category');
    } if (isNaN(amt) || amt <= 0) {
        alert('Kindly enter a valid amount');
    }if (dates === '') {
        alert('Kindly select a date');
    } if (des === '') {
        alert('Kindly put in some description');
        
    }
    if (cat === "Food & Beverages") {
        myChart.data.datasets[0].data[0]= myChart.data.datasets[0].data[0]+amt;
       
    } else if (cat === "Rent") {
        myChart.data.datasets[0].data[1]= myChart.data.datasets[0].data[1]+amt;
        
    } else if (cat === "Transport") {
        myChart.data.datasets[0].data[2]= myChart.data.datasets[0].data[2]+amt;
    } else if (cat === "Luxuries") {
        myChart.data.datasets[0].data[3]= myChart.data.datasets[0].data[3]+amt;
        
    } else {
        // Code to execute if cat is none of the above
    }
    myChart.update();
    expenses.push({cat,amt,dates,des});
    total+=amt;
    totalAmount.textContent=total;

    const newRow= expensesTableBody.insertRow();
    const categorycell= newRow.insertCell();
    const amountcell= newRow.insertCell();
    const datecell= newRow.insertCell();
    const descripcell= newRow.insertCell();
    const deletecell= newRow.insertCell();
    const deletebtn= document.createElement('button');

    deletebtn.textContent='Delete';
    deletebtn.classList.add('deletebtn');
    deletebtn.addEventListener('click', function(){
        expenses.splice(expenses.indexOf(expense),1);

        total-=expense.amt;
        totalAmount.textContent=total

        expensesTableBody.removeChild(newRow);
    })

    const expense= expenses[expenses.length -1];
    categorycell.textContent=expense.cat;
    amountcell.textContent=expense.amt;
    datecell.textContent=expense.dates;
    descripcell.textContent=expense.des;
    deletecell.appendChild(deletebtn);


})

for(const expense of expenses){
    total+=expense.amt;
    totalAmount.textContent= total;

    const newRow= expensesTableBody.insertRow();
    const categorycell= newRow.insertCell();
    const amountcell= newRow.insertCell();
    const datecell= newRow.insertCell();
    const descripcell= newRow.insertCell();
    const deletecell= newRow.insertCell();
    const deletebtn= document.createElement('button');

    deletebtn.textContent='Delete';
    deletebtn.classList.add('deletebtn');
    deletebtn.addEventListener('click', function(){
        total-=expense.amt;
        totalAmount.textContent=total
        expenses.splice(expenses.indexOf(expense),1);


        expensesTableBody.removeChild(newRow);
    });

    categorycell.textContent=expense.cat;
    amountcell.textContent=expense.amt;
    datecell.textContent=expense.dates;
    descripcell.textContent=expense.des;
    deletecell.appendChild(deletebtn);
    
}