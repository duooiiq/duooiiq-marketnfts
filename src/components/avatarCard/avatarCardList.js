import React from "react";

import { makeStyles, GridList, GridListTile } from "@material-ui/core";
import AvatarCard from "./avatarCard";

import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  gridList: {
    padding: "auto",
    margin: "auto",
  },
}));

const AvatarCardList = (props) => {
  const classes = useStyles();
  // console.log(props.AvatarCards);

  const getGridListCols = () => {
    if (isWidthUp("xl", props.width)) {
      return 4;
    }

    if (isWidthUp("lg", props.width)) {
      return 3;
    }

    if (isWidthUp("md", props.width)) {
      return 2;
    }
    if (isWidthUp("sm", props.width)) {
      return 2;
    }

    return 1;
  };

  return (
    <GridList
      spacing={15}
      cellHeight={'100% !important'}
      cols={getGridListCols()}
      className={classes.gridList}
    >
      {props.avatarCards.map((cardItem, index) => {
        // console.log(
        //   cardItem.name,
        //   cardItem.rarity,
        //   cardItem.cid,
        //   cardItem.sellPrice,
        //   cardItem.maxBid,
        //   cardItem.clothType
        // );
        return (
          <GridListTile key={index}>
            <AvatarCard
                headImg = {cardItem.headImg}
                middleImg = {cardItem.middleImg}
                bottomImg = {cardItem.bottomImg}
                username = {cardItem.username}
                address = {cardItem.address}
              // name={cardItem.name}
              // frequency={cardItem.rarity}
              // owner={cardItem.owner}
              // imgUrl={"https://ipfs.io/ipfs/"+cardItem.cid}
              // price={cardItem.sellPrice}
              // auctionPrice={cardItem.maxBid}
              // type={cardItem.clothType}
              // isBiddable={cardItem.isBiddable}/
              // isOnSale={cardItem.isOnSale}
              // id={cardItem.id}
              // isProfile={props.isProfile}
            />
          </GridListTile>
        );
      })}
    </GridList>
  );
};

export default withWidth()(AvatarCardList);
