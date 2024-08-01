const nextBtn = document.getElementById('nextButton');
const inputs = document.querySelectorAll('.infoInput');
const firstPage = document.getElementById('formContainer');
const backBtn = document.getElementById('backButton');
const secondPage = document.getElementById('planContainer');
const thirdPage = document.querySelector('#addsContainer');
const containers = document.querySelectorAll('.container')
const lastPage = document.querySelector('#summaryContainer');
const line = document.querySelector('hr');

let pageIndex = 1;

nextBtn.addEventListener('click', () => {
    inputs.forEach(input => {
        const errorText = document.createElement('p');
        errorText.textContent = 'The field is required';
        errorText.className = 'errorText';
        errorText.style.color = 'hsl(354, 84%, 57%)';
        errorText.style.fontFamily = 'boldUbuntu';

        if(input.value.trim() === '')
        {
            input.parentElement.appendChild(errorText);
            input.style.borderColor = 'hsl(354, 84%, 57%)';
        }
    })

    const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');

    if(allFilled) 
    {
        pageIndex ++;
        UpdatePages();
    }
})

backBtn.addEventListener('click', () => {
    pageIndex--;
    UpdatePages();
});

const finalPage = document.getElementById('finalPage');

function UpdatePages()
{
    const stepList = document.querySelector('#steps');
    const steps = stepList.querySelectorAll('li');
    steps.forEach(step => {step.style.backgroundColor = 'transparent'; step.style.color = 'white'; step.style.border = '1px solid white'});
    containers.forEach(container => container.style.display = 'none');
    line.style.display = 'none';

    switch(pageIndex)
    {
        case 1:
            steps[0].style.backgroundColor = 'hsl(228, 100%, 84%)';
            steps[0].style.color = 'hsl(213, 96%, 18%)';
            steps[0].style.border = 'none';
            backBtn.style.display = 'none';
            firstPage.style.display = 'block';
            break;
        case 2:
            steps[1].style.backgroundColor = 'hsl(228, 100%, 84%)';
            steps[1].style.color = 'hsl(213, 96%, 18%)';
            steps[1].style.border = 'none';
            backBtn.style.display = 'block';
            secondPage.style.display = 'block';
            break;
        case 3:
            steps[2].style.backgroundColor = 'hsl(228, 100%, 84%)';
            steps[2].style.color = 'hsl(213, 96%, 18%)';
            steps[2].style.border = 'none';
            thirdPage.style.display = 'block';
            break;
        case 4:
            steps[3].style.backgroundColor = 'hsl(228, 100%, 84%)';
            steps[3].style.color = 'hsl(213, 96%, 18%)';
            steps[3].style.border = 'none';
            lastPage.style.display = 'block';
            line.style.display = 'block';
            nextBtn.style.backgroundColor = 'hsl(243, 100%, 62%)';
            nextBtn.textContent = 'Confirm';
            CalculateFinalPrice();
            break;
        case 5:
            finalPage.style.display = 'block';
            nextBtn.style.display = 'none';
            backBtn.style.display = 'none';
            line.style.display = 'none';
            break;
        default:
            steps[0].style.backgroundColor = 'hsl(228, 100%, 84%)';
            steps[0].style.color = 'hsl(213, 96%, 18%)';
            steps[0].style.border = 'none';
            backBtn.style.display = 'none';
            break;
    }
}

const slider = document.getElementById('slider');
const thumb = document.getElementById('thumb'); 
const monthlyText = document.getElementById('monthlyText');
const yearlyText = document.getElementById('yearlyText');
let isDragging = false;

const arcadeButton = document.getElementById('arcadeBtn');
const advancedButton = document.getElementById('advancedBtn');
const proButton = document.getElementById('proBtn');

const planButtons = document.querySelectorAll('.planBtn');

let yearly = false;

const extraTexts = document.querySelectorAll('.extraText');
const priceTexts = document.querySelectorAll('.priceText');

let arcadePrice = 9, advancedPrice = 12, proPrice = 15;
let servicePrice = 1, storagePrice = 2, profilePrice = 2;

const servicePayment = document.getElementById('servicePayment');
const storagePayment = document.getElementById('storagePayment');
const profilePayment = document.getElementById('profilePayment');

const servicePaymentValue = servicePayment.querySelector('span');
const storagePaymentValue = storagePayment.querySelector('span');
const profilePaymenValue = profilePayment.querySelector('span');

thumb.addEventListener('click', () => {
  if (isDragging === false) {
    thumb.style.left = '55%';
    monthlyText.style.color = 'hsl(231, 11%, 63%)';
    yearlyText.style.color = 'hsl(213, 96%, 18%)';

    arcadePrice *= 10;
    advancedPrice *= 10;
    proPrice *= 10;
    servicePrice *= 10;
    storagePrice *= 10;
    profilePrice *= 10;

    planButtons.forEach(planButton => {
        planButton.querySelector('p').style.marginTop = '10%';
    })

    extraTexts.forEach(extraText => {
        extraText.style.display = 'block';
    });

    isDragging = true;
  }
  else
  {
    thumb.style.left = '10%';
    yearlyText.style.color = 'hsl(231, 11%, 63%)';
    monthlyText.style.color = 'hsl(213, 96%, 18%)';

    arcadePrice = arcadePrice / 10;
    advancedPrice = advancedPrice / 10;
    proPrice = proPrice / 10;
    servicePrice = servicePrice / 10;
    storagePrice = storagePrice / 10;
    profilePrice = profilePrice / 10;

    planButtons.forEach(planButton => {
        planButton.querySelector('p').style.marginTop = '25%';
    })

    extraTexts.forEach(extraText => {
        extraText.style.display = 'none';
    });

    isDragging = false;
  }

  arcadeButton.querySelector('span').textContent = `$${arcadePrice}/yr`;
  advancedButton.querySelector('span').textContent = `$${advancedPrice}/yr`;
  proButton.querySelector('span').textContent = `$${proPrice}/yr`;
  priceTexts[0].textContent = `+$${servicePrice}/yr`;
  priceTexts[1].textContent = `+$${storagePrice}/yr`;
  priceTexts[2].textContent = `+$${profilePrice}/yr`;

  servicePaymentValue.textContent = `+$${servicePrice}/yr`;
  storagePaymentValue.textContent = `+$${storagePrice}/yr`;
  profilePaymenValue.textContent =  `+$${profilePrice}/yr`;
});

let clicked = false;

arcadeButton.classList.add('toggle');

planButtons.forEach(planButton => {
    planButton.addEventListener('click', () => {
        planButtons.forEach(btn => btn.classList.remove('toggle'));
        planButton.classList.add('toggle');
    })
})

const addsBtn = document.querySelectorAll('.addsButton');

let isClicked = false;

addsBtn.forEach(addBtn => {
    const checkMark = addBtn.querySelector('img');
    const markBg = addBtn.querySelector('div');
    addBtn.addEventListener('click', () => {
        if(!isClicked)
        {
            addBtn.classList.add('activate');
            markBg.style.backgroundColor = 'hsl(243, 100%, 62%)';
            checkMark.style.display = 'block';
            isClicked = true;
        }
        else
        {
            addBtn.classList.remove('activate');
            markBg.style.backgroundColor = 'transparent';
            checkMark.style.display = 'none';
            isClicked = false;
        }

    });
});

const payments = document.querySelectorAll('.payment');
const totalAmount = document.getElementById('totalAmount');
const totalText = document.getElementById('total');
const planText = document.getElementById('arcadeText');
const planAmount = document.getElementById('totalPayment');
const summaryCanvas = document.getElementById('summaryBg');
const onlineService = document.getElementById('onlineService');
const largerStorage = document.getElementById('largerStorage');
const customizableProfile = document.getElementById('cuztomizableProfile');


function CalculateFinalPrice()
{
    const plan = document.querySelector('.toggle');
    const services = document.querySelectorAll('.activate');
    let planPrice = 0, addsPrice = 0, totalPrice = 0, canvasHeight = 100;
    onlineService.style.display ='none';
    largerStorage.style.display ='none';
    customizableProfile.style.display = 'none';

    switch(plan.id)
    {
        case 'arcadeBtn':
            planPrice = arcadePrice;
            if(isDragging)
            {
                planText.textContent = 'Arcade (Yearly)';
            }
            else
            {
                planText.textContent = 'Arcade (Monthly)';
            }
            break;
        case 'advancedBtn':
            planPrice = advancedPrice;
            if(isDragging)
            {
                planText.textContent = 'Advanced (Yearly)';
            }
            else
            {
                planText.textContent = 'Advanced (Monthly)';
            }
            break;
        case 'proBtn':
            planPrice = proPrice;
            if(isDragging)
            {
                planText.textContent = 'Pro (Yearly)';
            }
            else
            {
                planText.textContent = 'Pro (Monthly)';
            }
            break;
        default:
            planPrice = arcadePrice;
            if(isDragging)
            {
                planText.textContent = 'Arcade (Yearly)';
            }
            else
            {
                planText.textContent = 'Arcade (Monthly)';
            }
            break;
    }

    services.forEach(service => {
        switch(service.id)
        {
            case 'serviceBtn':
                addsPrice += servicePrice;
                canvasHeight += 43;
                onlineService.style.display ='block';
                break;
            case 'storageBtn':
                addsPrice += storagePrice;
                canvasHeight += 43;
                largerStorage.style.display ='block';
                break;
            case 'profileBtn':
                addsPrice += profilePrice;
                canvasHeight += 43;
                customizableProfile.style.display = 'block';
                break;
            default:
                canvasHeight = 100;
                break;
        }
    })

    totalPrice = planPrice + addsPrice;
    summaryCanvas.style.height = `${canvasHeight}px`;

    if(isDragging)
    {
        totalText.innerHTML = 'Total (per year)';
        totalAmount.textContent = `+$${totalPrice}/yr`;
        planAmount.textContent = `$${planPrice}/yr`;
    }
    else
    {
        totalText.innerHTML = 'Total (per month)';
        totalAmount.textContent = `+$${totalPrice}/mo`;
        planAmount.textContent = `$${planPrice}/mo`;
    }
}