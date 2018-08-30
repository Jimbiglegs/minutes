import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateTimeField from './DateTimeField';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    },
  });


  class TextFields extends React.Component {

    state = {
        Title: 'Enter your meeting title here..',
        Attendees: 'List of Attendees',
        Notes: 'Your initial notes here..'
      };


    render(){

        const { classes } = this.props;

        return(
        <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="title"
          label="Title"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleChange('title')}
          margin="normal"
        />
        <TextField
          id="attendees"
          label="Attendees"
          className={classes.textField}
          value={this.state.attendees}
          onChange={this.handleChange('attendees')}
          margin="normal"
        />
        <DateTimeField />
        <TextField
          id="location"
          label="Location"
          className={classes.textField}
          value={this.state.attendees}
          onChange={this.handleChange('attendees')}
          margin="normal"
        />
        </form>
        )
    }



  }
