import React, { FC, useEffect } from "react";
import styles from "./igredient-details.module.css";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { useLocation } from "react-router-dom";


function FeedDetails() {
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const location = useLocation();
  let { id } = useParams();


  return (
    <div>feed-details</div>
  )
}

export default FeedDetails