import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = () => {
    return (
        <div className={"Burger"}>
         <BurgerIngredient type="bread-top"></BurgerIngredient>   
         <BurgerIngredient type="cheese"></BurgerIngredient>   
         <BurgerIngredient type="meat"></BurgerIngredient>   
         <BurgerIngredient type="bread-bottom"></BurgerIngredient>   
        </div>
    );
};

export default burger;