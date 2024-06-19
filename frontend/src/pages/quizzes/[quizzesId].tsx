import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/quizzes/quizzesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditQuizzes = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    title: '',

    description: '',

    difficulty: '',

    questions: [],

    participants: [],

    organization: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { quizzes } = useAppSelector((state) => state.quizzes);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { quizzesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: quizzesId }));
  }, [quizzesId]);

  useEffect(() => {
    if (typeof quizzes === 'object') {
      setInitialValues(quizzes);
    }
  }, [quizzes]);

  useEffect(() => {
    if (typeof quizzes === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = quizzes[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [quizzes]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: quizzesId, data }));
    await router.push('/quizzes/quizzes-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit quizzes')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit quizzes'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Title'>
                <Field name='title' placeholder='Title' />
              </FormField>

              <FormField label='Description' hasTextareaHeight>
                <Field
                  name='description'
                  id='description'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Difficulty' labelFor='difficulty'>
                <Field name='Difficulty' id='Difficulty' component='select'>
                  <option value='easy'>easy</option>

                  <option value='medium'>medium</option>

                  <option value='hard'>hard</option>
                </Field>
              </FormField>

              <FormField label='Questions' labelFor='questions'>
                <Field
                  name='questions'
                  id='questions'
                  component={SelectFieldMany}
                  options={initialValues.questions}
                  itemRef={'questions'}
                  showField={'question_text'}
                ></Field>
              </FormField>

              <FormField label='Participants' labelFor='participants'>
                <Field
                  name='participants'
                  id='participants'
                  component={SelectFieldMany}
                  options={initialValues.participants}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              {hasPermission(currentUser, 'READ_ORGANIZATIONS') && (
                <FormField label='organization' labelFor='organization'>
                  <Field
                    name='organization'
                    id='organization'
                    component={SelectField}
                    options={initialValues.organization}
                    itemRef={'organizations'}
                    showField={'name'}
                  ></Field>
                </FormField>
              )}

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/quizzes/quizzes-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditQuizzes.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_QUIZZES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditQuizzes;
