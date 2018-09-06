import React,{Component} from 'react';
import Group from '../component/Group';

export default class Landing extends Component {

    render() {
        return <Group>
                <div class='container landing-container'>
                    <div class='row text-center my-big'>
                        <div class='col'>
                            <h1>How it works?</h1>
                        </div>
                    </div>

                    <div class='row text-center work-block'>
                        <div class='col'>
                            <svg version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style={{ 'enable-background' : 'new 0 0 100 100' }}><path d="M8.1,85.8V98h54.1V85.8c0-7.4-5.7-13.1-13.1-13.1H21.3C14.2,72.7,8.1,78.5,8.1,85.8z"/><path d="M35.1,67.3c8.3,0,15.1-6.8,15.1-15.1s-6.8-15.1-15.1-15.1S20,43.9,20,52.2C20.2,60.5,26.8,67.3,35.1,67.3z"/><path d="M70.5,69.5c6.6,0,11.8-5.4,11.8-11.8s-5.4-11.8-11.8-11.8c-6.6,0-11.8,5.4-11.8,11.8S63.9,69.5,70.5,69.5z"/><path d="M81.4,73.8H61c3.4,2.9,5.5,7.3,5.5,12.1L67,98h24.8V84.1C91.8,78.4,87.2,73.8,81.4,73.8z"/><path d="M67,13.4c-0.5,0-1,0.4-1,1v5.9c0,0.5,0.4,1,1,1h5.1c0.5,0,1-0.4,1-1c0-0.5-0.4-1-1-1h-4.1v-4.9  C67.9,13.9,67.5,13.4,67,13.4z"/><path d="M83.9,15.9C81.5,6.5,71.8,0.8,62.3,3.3c-9.4,2.5-15.1,12.2-12.6,21.6c1.2,4.5,4,8.1,7.6,10.4l-4.6,7.1  l18.7-4.9C80.8,35.1,86.4,25.4,83.9,15.9z M66.8,29.8c-5.5,0-9.9-4.4-9.9-9.9c0-5.5,4.4-9.9,9.9-9.9c5.5,0,9.9,4.4,9.9,9.9  C76.8,25.3,72.3,29.8,66.8,29.8z"/><text x="0" y="115" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Aneeque Ahmed</text><text x="0" y="120" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
                            <br />

                            <h3>Schedule A Meeting</h3>

                            <p class='landing-block'>
                                Simply schedule your meeting for a given date and 
                                time. Add your team members as attendees.
                            </p>
                        </div>
                        <div class='col'>
                            <svg viewBox="0 0 100 100" x="0px" y="0px"><title>Artboard 21</title><path d="M95.55,45.41l-1.33-1,2.17-3a9.3,9.3,0,0,0-2.1-13L92,26.8a9.3,9.3,0,0,0-13,2.11l-35.27,49A2.5,2.5,0,0,0,43.28,79L41,96.17a2.5,2.5,0,0,0,3.57,2.57l15.59-7.57a2.5,2.5,0,0,0,.94-.79L91.29,48.51l1.33,1a2.73,2.73,0,0,1,.62,3.82l-10.85,15a2.5,2.5,0,1,0,4.06,2.92l10.85-15a7.73,7.73,0,0,0-1.75-10.8Zm-49,46.81L47.9,82.16a9.6,9.6,0,0,1,7.81,5.63ZM92.33,38.52,59.44,84.16a14.53,14.53,0,0,0-9.28-6.69L83.05,31.83a4.3,4.3,0,0,1,6-1l2.31,1.66A4.3,4.3,0,0,1,92.33,38.52Z"/><path d="M34.78,85.37H9.44a3.2,3.2,0,0,1-3.2-3.2V29h57.5v5.83a2.5,2.5,0,0,0,5,0V17.65a8.21,8.21,0,0,0-8.2-8.2H57.9v-6a2.5,2.5,0,0,0-5,0v6H44.29v-6a2.5,2.5,0,0,0-5,0v6H30.69v-6a2.5,2.5,0,0,0-5,0v6H17.08v-6a2.5,2.5,0,0,0-5,0v6H9.44a8.21,8.21,0,0,0-8.2,8.2V82.18a8.21,8.21,0,0,0,8.2,8.2H34.78a2.5,2.5,0,0,0,0-5ZM6.24,17.65a3.2,3.2,0,0,1,3.2-3.2H60.55a3.2,3.2,0,0,1,3.2,3.2V24H6.24Z"/><circle cx="16.85" cy="43.8" r="2.97" transform="translate(-30.06 44.99) rotate(-70.41)"/><circle cx="16.85" cy="56.88" r="2.97" transform="translate(-42.38 53.68) rotate(-70.41)"/><circle cx="16.85" cy="69.96" r="2.97" transform="translate(-54.7 62.37) rotate(-70.41)"/><path d="M54.82,43.8a2.5,2.5,0,0,0-2.5-2.5H27.94a2.5,2.5,0,1,0,0,5H52.32A2.5,2.5,0,0,0,54.82,43.8Z"/><path d="M27.94,54.38a2.5,2.5,0,1,0,0,5H44.35a2.5,2.5,0,1,0,0-5Z"/><path d="M36,67.46h-8a2.5,2.5,0,1,0,0,5h8a2.5,2.5,0,0,0,0-5Z"/><text x="0" y="115" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Gregor Cresnar</text><text x="0" y="120" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
                            <br />

                            <h3>Take Notes</h3>

                            <p class='landing-block'>
                                When in meeting, open the app, and take notes. Add
                                action items as tasks, todo's, decisions and more.
                            </p>
                        </div>
                        <div class='col'>
                            <svg version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100"><g><path d="M42.766,28.778c-0.688-0.548-1.688-0.438-2.237,0.249l-6.844,8.555c-0.148,0.187-0.304,0.31-0.438,0.294   c-0.12-0.006-0.277-0.131-0.409-0.329l-2.334-3.503c-0.487-0.731-1.477-0.93-2.207-0.442c-0.732,0.487-0.93,1.476-0.442,2.208   l2.335,3.503c0.706,1.058,1.769,1.693,2.92,1.743c0.05,0.003,0.098,0.003,0.146,0.003c1.097,0,2.152-0.536,2.914-1.488l6.844-8.554   C43.563,30.329,43.452,29.329,42.766,28.778z"/><path d="M67.7,34.422h-18.52c-0.88,0-1.593,0.713-1.593,1.591c0,0.88,0.713,1.592,1.593,1.592H67.7c0.88,0,1.593-0.712,1.593-1.592   C69.293,35.135,68.58,34.422,67.7,34.422z"/><path d="M42.766,47.589c-0.688-0.549-1.688-0.438-2.237,0.248l-6.844,8.556c-0.148,0.187-0.324,0.296-0.438,0.292   c-0.12-0.006-0.277-0.132-0.409-0.329l-2.334-3.501c-0.489-0.733-1.477-0.929-2.207-0.443c-0.732,0.488-0.93,1.476-0.441,2.209   l2.334,3.5c0.706,1.059,1.77,1.696,2.92,1.744c0.05,0.003,0.098,0.005,0.146,0.005c1.098,0,2.153-0.537,2.914-1.489l6.844-8.553   C43.563,49.139,43.452,48.138,42.766,47.589z"/><path d="M67.7,53.231h-18.52c-0.88,0-1.593,0.712-1.593,1.592s0.713,1.592,1.593,1.592H67.7c0.88,0,1.593-0.712,1.593-1.592   S68.58,53.231,67.7,53.231z"/><path d="M67.7,72.041h-18.52c-0.88,0-1.593,0.713-1.593,1.593s0.713,1.592,1.593,1.592H67.7c0.88,0,1.593-0.712,1.593-1.592   S68.58,72.041,67.7,72.041z"/><path d="M70.877,12.234C70.799,8.233,67.524,5,63.505,5h-27.01c-4.021,0-7.294,3.233-7.372,7.234h-3.238   c-6.197,0-11.238,5.042-11.238,11.239v60.288C14.646,89.958,19.688,95,25.885,95h48.23c6.197,0,11.238-5.042,11.238-11.238V23.474   c0-6.197-5.041-11.239-11.238-11.239H70.877z M32.3,12.38c0-2.313,1.882-4.196,4.195-4.196h27.01c2.313,0,4.195,1.883,4.195,4.196   v2.894c0,2.313-1.882,4.196-4.195,4.196h-27.01c-2.313,0-4.195-1.883-4.195-4.196V12.38z M82.17,23.474v60.288   c0,4.441-3.612,8.055-8.055,8.055h-48.23c-4.441,0-8.055-3.613-8.055-8.055V23.474c0-4.441,3.613-8.055,8.055-8.055h3.238   c0.078,4.001,3.352,7.234,7.372,7.234h27.01c4.02,0,7.294-3.233,7.372-7.234h3.238C78.558,15.419,82.17,19.032,82.17,23.474z"/></g><text x="0" y="115" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by David</text><text x="0" y="120" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
                            <br />

                            <h3>Track Action Items</h3>

                            <p class='landing-block'>
                                Track the various action items and their progress.
                                Mark items done, on-hold or blocked.
                            </p>
                        </div>
                    </div>

                    <div class='row my-big'>
                        <div class='col text-center'>
                            <h1>Awesome Features</h1>
                        </div>
                    </div>

                    <div class='row text-center awesome-logo'>
                        <div class='col'>
                            <img style={{ 'width': '100px' }} src='https://cdn.zapier.com/storage/photos/98dfdf3827082a15da731db63938da96.png' />
                        </div>
                        <div class='col'>
                            <img src='/images/slack.png' style={{'max-width': '128px' }} />
                        </div>
                        <div class='col'>
                            <img style={{ 'width': '192px' }} src='https://s.smore.com/u/f26f28bbbb19bf1ed4acc4bf2191667f.png' />
                        </div>
                    </div>
                    <div class='row text-center awesome-block'>
                        <div class='col'>
                            <h3>Google Authentication</h3>

                            <p class='feature-block'>
                                Single-sign-on powered by Google authentication, seamlessly access
                                your meetings, than worrying about sign-in each time.
                            </p>
                        </div>
                        <div class='col'>
                            <h3>Slack Integration</h3>

                            <p class='feature-block'>
                                Notify members when meetings are scheduled, action
                                items are assigned and/or updated.
                            </p>
                        </div>
                        <div class='col'>
                            <h3>Google Calendar</h3>

                            <p class='feature-block'>
                                Integrated with Google Calendar. All your meetings
                                are scheduled and tracked by Google.
                            </p>
                        </div>
                    </div>
                </div>
            </Group>;
    }
}
