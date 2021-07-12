import React from 'react';
import { useHistory } from 'react-router-dom';
import ventesIcon from "../../images/ventesIcon.png"
import achatsIcon from "../../images/achatsIcon.png"
import caisseIcon from "../../images/caisseIcon.png"
import contactsIcon from "../../images/contactsIcon.png"
import facturesIcon from "../../images/facturesIcon.png"
import { List, ListItem } from '@material-ui/core';

export default function SideNav() {
  const history = useHistory();

  return (
    <div className="sideNav" >
    {
      links.map(item => (
        <List component="nav" aria-label="main mailbox folders" key={item.title}>
          <div onClick={() => history.push(item.title.toLowerCase())}>
            <ListItem
              button
              selected={item.title.toLowerCase() === history.location.pathname.slice(1)}
            >
              <div style={{ width: 10 }}/>
              <img src={item.icon} style={{ height: 27, width: 27 }} alt=""/>
              <span>{item.title}</span> 
            </ListItem>
          </div>
        </List>
        ))
    }
    </div>
  );
}

const links = [
  { icon: caisseIcon, title: "Caisse" },
  { icon: ventesIcon, title: "Ventes" },
  { icon: achatsIcon, title: "Achats" },
  { icon: facturesIcon, title: "Factures" },
  { icon: contactsIcon, title: "Contacts" },
]