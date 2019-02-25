import React from 'react';
import store from '../../../stores/store'
import { observer } from 'mobx-react'

const SectionContainer = observer(props => (
  <section className={store.loading
                      ? 'hidden'
                      : 'section__container animate__fade-in--long'}>

    <header className={props.title ? 'animate__fade-in--long' : 'remove'}>
      <h2 className='text text--large text--underline text--no-padding'>
        {props.title}
      </h2>
      <p className={props.description ? 'section-container__text text--small text--no-padding' : 'remove'}
         style={{ textAlign: 'left' }}>
        {props.description}
      </p>
      <p className={props.warning ? 'section-container__text text--x-small text--no-padding' : 'remove'}>
        {props.warning}
      </p>
    </header>
    {props.children}
  </section>
))

export default SectionContainer
