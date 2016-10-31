import {renderComponent, getEl} from '../setup'
import Pager from '../../app/components/Pager'

describe('<Pager />', () => {
  let subject, $subject

  it('exists', () => {
    subject = renderComponent(Pager)
    $subject = getEl(subject)

    expect(subject).to.exist
  })

  it('shows the displayed range', () => {
    const props = {page:0, pageSize: 100, found:100, totalPages: 1000, totalItems:100000}
    subject = renderComponent(Pager, props)
    $subject = getEl(subject)

    expect($subject.find('.ui.label.pager--range')).to.exist
    expect($subject.find('.ui.label.pager--range')).to.have.text('1-100')
  })

  it('shows prev if there is a previous range', () => {
    const props = {page:2, pageSize: 100, found:100, totalPages: 3, totalItems:300}
    subject = renderComponent(Pager, props)
    $subject = getEl(subject)

    expect($subject.find('.ui.button.pager--prev')).to.exist
  })

  it('hides prev if there is no previous range', () => {
    const props = {page:0, pageSize: 100, found:100, totalPages: 1, totalItems:100}
    subject = renderComponent(Pager, props)
    $subject = getEl(subject)

    expect($subject.find('.ui.button.pager--prev')).not.to.exist
  })

  it('hides "prev" and show "first" if there is only 1 previous range', () => {
    const props = {page:1, pageSize: 100, found:100, totalPages: 2, totalItems:200}
    subject = renderComponent(Pager, props)
    $subject = getEl(subject)

    expect($subject.find('.ui.button.pager--prev')).not.to.exist
    expect($subject.find('.ui.button.pager--first')).to.exist
  })
  
  it('hides "next" and show "last" if there is only 1 further range', () => {
    const props = {page:8, pageSize: 100, found:100, totalPages: 10, totalItems:1000}
    subject = renderComponent(Pager, props)
    $subject = getEl(subject)

    expect($subject.find('.ui.button.pager--next')).not.to.exist
    expect($subject.find('.ui.button.pager--last')).to.exist
  })
})
