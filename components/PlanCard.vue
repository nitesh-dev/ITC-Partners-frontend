<script setup lang='ts'>
</script>
<template>
    <div class="plan card">
        <p class="banner">Mega offer 30% off</p>
        <img src="../public/images/finance_loan.jpg">

        <div class="content">
            <h2>Loan finance</h2>
            <p>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries</p>

            <div class="pricing">
                <span class="discount">₹10,000</span>
                <span class="price">₹15,000</span>
            </div>

            <button class="primary">Apply now</button>
        </div>

        
    </div>
</template>
<style scoped>
.plan {
    width: 300px;
    min-height: 400px;
    position: relative;
    overflow: auto;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin-bottom: 1rem;
}

.plan .banner {
    width: max-content;
    position: absolute;
    left: 0;
    top: 0;
    background-color: var(--color-secondary);
    margin: 0;
    color: white;
    font-size: var(--small-font);
    padding: 0.5em 1em;
    border-top-left-radius: var(--medium-radius);
}


.plan img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: var(--medium-radius) var(--medium-radius) 0 0;
}

.plan .content {
    padding: 1rem;
}

.plan h2 {
    margin-top: 0;
    text-align: center;
    color: var(--color-secondary);
}

.plan .content p {
    text-align: center;
    color: var(--color-on-surface-dark);
    opacity: 0.8;
}


.pricing {
    margin: 2rem 0;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    justify-content: center;
}

.pricing .discount {
    font-size: var(--average-2-font);
    color: var(--color-on-surface-dark);
    font-weight: bold;
}

.pricing .price {
    text-decoration: line-through;
    color: var(--color-on-surface);
}

.plan button {
    display: block;
    width: 100%;
}
</style>