import React from 'react';
import {
  Grid, MenuItem, Typography, Button,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';

import StatusSwitch from './status-switch';
import { Project } from '../../models/project.model';


type ProjectValue = Project['_id'] | 'default';

interface OtherProps {
  project_id: ProjectValue
  title: string
  projects: Project[]
  isLoadingProjects: boolean
}

interface FormValues {
  issue_title: string,
  issue_text: string,
  created_by: string,
  assigned_to: string,
  open: boolean,
  status_text: string,
  project_id: ProjectValue
}

type FormProps = OtherProps & FormikProps<FormValues>;

const AddIssueForm = (props: FormProps) => {
  const {
    projects,
    isLoadingProjects,
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    title,
    status: apiError,
  } = props;

  let projectSelectItems;
  if (isLoadingProjects) {
    projectSelectItems = (
      <MenuItem value="default">
        <em>Loading...</em>
      </MenuItem>
    );
  } else {
    projectSelectItems = [
      values.project_id === 'default' && (
        <MenuItem value="default" key={0}>
          <em>Select Project</em>
        </MenuItem>
      ),
      projects.map((project) => (
        <MenuItem value={project._id}>
          {project.name}
        </MenuItem>
      )),
    ];
  }

  return (
    <>
      <Typography variant="h4" color="textPrimary" style={{ fontWeight: 600 }}>{title}</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item sm={12} md>
            <TextField
              id="title"
              name="issue_title"
              label="Title"
              placeholder="Issue title"
              helperText={touched.issue_title ? errors.issue_title : ''}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              style={{
                minHeight: '4.5rem',
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              select
              label="Project"
              name="project_id"
              style={{
                marginTop: '16px',
                marginBottom: '8px',
              }}
            >
              {projectSelectItems}
            </TextField>
          </Grid>
        </Grid>
        <TextField
          id="text"
          name="issue_text"
          label="Text"
          placeholder="Issue text goes here..."
          helperText={touched.issue_text ? errors.issue_text : ''}
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          style={{
            minHeight: '4.5rem',
          }}
        />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="created-by"
              name="created_by"
              label="Created by"
              placeholder="Issue creator"
              helperText={touched.created_by ? errors.created_by : ''}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              style={{
                minHeight: '4.5rem',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="assigned-to"
              name="assigned_to"
              label="Assigned to"
              placeholder="Assignee"
              fullWidth
              helperText={touched.assigned_to && errors.assigned_to ? errors.assigned_to : 'Optional'}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          justify="center"
        >
          <Grid item>
            <StatusSwitch
              id="status"
              onChange={(open: boolean) => setFieldValue('open', open)}
              value={values.open}
            />
          </Grid>
          <Grid item xs={12} sm>
            <TextField
              id="status-text"
              name="status_text"
              label="Status text"
              placeholder="Status text goes here..."
              helperText={touched.status_text && errors.status_text ? errors.status_text : 'Optional'}
              fullWidth
              multiline
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginTop: 0 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} justify="flex-end">
          <Grid item>
            {apiError && <Typography variant="body1" color="textPrimary">{apiError}</Typography>}
          </Grid>
          <Grid item>
            <Button type="submit" disabled={isSubmitting} variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

// prevent render when new project_id has been set, but values.project_id hasn't been updated yet
// avoids flashing "Select Value" when a project has already been selected
const compareProps = (prevProps: FormProps, nextProps: FormProps): boolean => (
  nextProps.project_id && nextProps.values.project_id === 'default'
);

export default withFormik<OtherProps, FormValues>({
  mapPropsToValues: (props) => ({
    project_id: props.project_id || 'default',
    issue_title: '',
    issue_text: '',
    created_by: '',
    assigned_to: '',
    open: true,
    status_text: '',
  }),
  validationSchema: Yup.object().shape({
    project_id: Yup.string().notOneOf(['default'], 'No project selected'),
    issue_title: Yup.string().required('Required'),
    issue_text: Yup.string().required('Required'),
    created_by: Yup.string().required('Required'),
    assigned_to: Yup.string().notRequired(),
    open: Yup.boolean().required(),
    status_text: Yup.string().notRequired(),
  }),
  enableReinitialize: true,
  async handleSubmit(formValues: FormValues, { props, setSubmitting, setStatus }) {
    setSubmitting(true);
    const projectName = props.projects.find((project) => (
      project._id === formValues.project_id
    )).name;
    const requestBody = { ...formValues };
    delete requestBody.project_id;
    try {
      await Axios.post(
        `${process.env.API_URL}/issues/${projectName}`,
        requestBody,
        { headers: { 'Content-Type': 'application/json' } },
      );
    } catch (e) {
      setStatus(e.response.data);
    }
    setSubmitting(false);
  },
})(React.memo(AddIssueForm, compareProps));
