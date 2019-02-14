import React from 'react';
import './Burger.css';
import burgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = () => {
    return (
        <div className={"Burger"}>
         <burgerIngredient type="bread-top"></burgerIngredient>   
         <burgerIngredient type="cheese"></burgerIngredient>   
         <burgerIngredient type="meat"></burgerIngredient>   
         <burgerIngredient type="bread-bottom"></burgerIngredient>   
        </div>
    );
};

export default burger;