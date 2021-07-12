import React from 'react';
import { useSelector } from "react-redux";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';

export default function Historique() {
  const transfertsState = useSelector(state => state.transfertsState);
  
  return (
    <Timeline align="alternate">
    {
      transfertsState
      .filter(transfert => transfert.type !== "encaissement")
      .map((transfert, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent>
            { 
              index % 2 === 0 ?
                <Left transfert={transfert}/>
              :
                <Right transfert={transfert}/>
            }
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot/>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            { 
              index % 2 === 0 ?
                <Right transfert={transfert}/>
              :
                <Left transfert={transfert}/>
            }
          </TimelineContent>
        </TimelineItem>
      ))
    }
    </Timeline>
  );
}

function Left({ transfert }) {
  return <Typography color="textSecondary">{transfert.date}</Typography>
}

function Right({ transfert }) {
  return (
    <>
      <Typography>
      {
        transfert.type === "importation" ?
          "Importation depuis " + transfert.option
        :
          "Transfert vers " + transfert.option
      }
      </Typography>
      <Typography color="primary">
        Montant: {transfert.montant}
      </Typography>
    </>
  );
}