import React, { useState } from 'react'
import { DeepSkillsService } from '../services/DeepSkillsService'

export default function feedback(props) {
  const ceramic = props.ceramic
  const ethereum = props.ethereum

  const localDidWell = localStorage.getItem('didWell')
  const [didWell, setDidWell] = useState(localDidWell)

  const localDidBad = localStorage.getItem('didBad')
  const [didBad, setDidBad] = useState(localDidBad)

  const handleChangeWell = e => {
    localStorage.setItem('didWell', e.target.value)
    setDidWell(e.target.value)
  }

  const handleChangeBad = e => {
    const deepSkillsService = new DeepSkillsService(ceramic, ethereum)
    localStorage.setItem('didBad', e.target.value)
    setDidBad(e.target.value)
  }

  function issueFeadback(e) {
      // setLoadingMessage('Updating skills...')
      // let t = setTimeout(() => {
      //     setLoadingMessage('')
      // }, 5000);

      const didWell = localStorage.getItem('didWell')
      const didBad = localStorage.getItem('didBad')

      const description = `${didWell};${didBad}`

      if(ceramic && ethereum) {
          (async() => {

            const deepSkillsService = new DeepSkillsService(ceramic, ethereum)

            const holderDid = 'did:3:kjzl6cwe1jw149u7xahdzwu6nsuwnf8iygdv0b7sbfwr3hyospdcx5ila6pvwc0'
            const skill1 = {
                holderDid,
                taskname: 'Turn corn flour into dough',
                description
            }

            await deepSkillsService.issueAndStoreDocument(skill1)

            const skill2 = {
                holderDid,
                taskname: 'Dice incredible amounts of onions',
                description
            }

            await deepSkillsService.issueAndStoreDocument(skill2)

          })()
      }

      // e.preventDefault();
  }

  return (
    <div class='e2504_57122'>
    <div class='e2504_57123'></div>
    <div class='e2504_57125'>
        <div class='ei2504_57125_1311_25521'><span class='ei2504_57125_1311_25515'>How was your collaboration?</span></div>
    </div>
    <div class='e2504_57126'>
        <div class='ei2504_57126_34_639'>
            <div class='ei2504_57126_34_640'>
                <div class='ei2504_57126_34_641'>
                    <div class='ei2504_57126_34_642'></div>
                    <div class='ei2504_57126_34_643'></div>
                    <div class='ei2504_57126_34_644'></div>
                    <div class='ei2504_57126_34_645'></div>
                    <div class='ei2504_57126_34_646'></div>
                    <div class='ei2504_57126_34_647'></div>
                </div>
                <div class='ei2504_57126_34_648'></div>
            </div>
            <div class='ei2504_57126_34_649'>
                <div class='ei2504_57126_34_650'></div>
                <div class='ei2504_57126_34_651'></div>
                <div class='ei2504_57126_34_652'></div>
                <div class='ei2504_57126_34_653'></div>
                <div class='ei2504_57126_34_654'></div>
                <div class='ei2504_57126_34_655'></div>
            </div>
        </div>
        <div class='ei2504_57126_863_19783'><span class='ei2504_57126_812_12160'><a href="/issuers">Organisations</a></span><span class='ei2504_57126_34_657'>Projects</span>
            <div class='ei2504_57126_1295_30746'>
                <div class='ei2504_57126_1295_30746_1287_27646'></div>
            </div>
        </div>
    </div>
    <div class='e2504_57127'>
        <div class='e2504_57128'>
            <div class='e2504_57129'><span class='e2504_57130'>Feedback Stepan</span><span class='e2504_57131'>This will be public and help other applicants understand why they have not been selected.</span></div>
            <div class='e2504_57133'>
                <div class='ei2504_57133_2170_82170'>
                    <div class='ei2504_57133_2170_82170_1465_32536'><span class='ei2504_57133_2170_82170_1315_25261'>What did Stepan do well? </span></div><span class='ei2504_57133_2170_82170_1315_25262'>This feedback will be public.</span></div>
                <div class='ei2504_57133_2170_82171'>
                    <div class='ei2504_57133_2170_82171_352_7945'></div>

                    <textarea
                      class='ei2504_57133_2170_82171_352_7946'
                      value={didWell}
                      onChange={handleChangeWell}
                      placeholder="They worked flawlessly on…"
                    ></textarea>

                </div>
            </div>
            <div class='e2504_57134'>
                <div class='ei2504_57134_2170_82170'>

                    <div class='ei2504_57134_2170_82170_1465_32536'><span class='ei2504_57134_2170_82170_1315_25261'>What can Stepan improve upon?</span></div><span class='ei2504_57134_2170_82170_1315_25262'>This feedback will also be public.</span></div>
                <div class='ei2504_57134_2170_82171'>
                    <div class='ei2504_57134_2170_82171_352_7945'></div>

                    <textarea
                      class='ei2504_57133_2170_82171_352_7946'
                        value={didBad}
                        onChange={handleChangeBad}
                        placeholder="They could’ve put more efforts on…"
                      ></textarea>

                </div>
            </div>
            <div class='e2504_57136'>
                <div class='ei2504_57136_402_13282'></div><span class='ei2504_57136_402_13283'>How would you describe Stepan’s ability to work on their tasks?</span>
                <div class='ei2504_57136_1346_28271'>
                    <div class='ei2504_57136_402_13324'>
                        <div class='ei2504_57136_402_13324_402_13416'>
                            <div class='ei2504_57136_402_13324_402_13416_402_13256'>
                                <div class='ei2504_57136_402_13324_402_13416_402_13257'>
                                    <div class='ei2504_57136_402_13324_402_13416_402_13258'>
                                        <div class='ei2504_57136_402_13324_402_13416_402_13259'></div>
                                        <div class='ei2504_57136_402_13324_402_13416_402_13260'></div>
                                    </div>
                                </div>
                                <div class='ei2504_57136_402_13324_402_13416_402_13261'></div>
                            </div>
                            <div class='ei2504_57136_402_13324_402_13416_402_13263'></div>
                        </div>
                        <div class='ei2504_57136_402_13324_349_8151'><span class='ei2504_57136_402_13324_349_8152'>Student</span><span class='ei2504_57136_402_13324_349_8153'>Can benefit from mentorship and guidance</span></div>
                    </div>
                    <div class='ei2504_57136_402_13345'>
                        <div class='ei2504_57136_402_13345_402_13416'>
                            <div class='ei2504_57136_402_13345_402_13416_1921_51170'>
                                <div class='ei2504_57136_402_13345_402_13416_1921_51171'>
                                    <div class='ei2504_57136_402_13345_402_13416_1921_51172'>
                                        <div class='ei2504_57136_402_13345_402_13416_1921_51173'></div>
                                        <div class='ei2504_57136_402_13345_402_13416_1921_51174'></div>
                                    </div>
                                </div>
                                <div class='ei2504_57136_402_13345_402_13416_1921_51175'></div>
                            </div>
                        </div>
                        <div class='ei2504_57136_402_13345_349_8151'><span class='ei2504_57136_402_13345_349_8152'>Collaborator</span><span class='ei2504_57136_402_13345_349_8153'>Can complete chosen tasks with a bit of support</span></div>
                    </div>
                    <div class='ei2504_57136_402_13365'>
                        <div class='ei2504_57136_402_13365_402_13416'>
                            <div class='ei2504_57136_402_13365_402_13416_1921_51170'>
                                <div class='ei2504_57136_402_13365_402_13416_1921_51171'>
                                    <div class='ei2504_57136_402_13365_402_13416_1921_51172'>
                                        <div class='ei2504_57136_402_13365_402_13416_1921_51173'></div>
                                        <div class='ei2504_57136_402_13365_402_13416_1921_51174'></div>
                                    </div>
                                </div>
                                <div class='ei2504_57136_402_13365_402_13416_1921_51175'></div>
                            </div>
                        </div>
                        <div class='ei2504_57136_402_13365_349_8151'><span class='ei2504_57136_402_13365_349_8152'>Professional</span><span class='ei2504_57136_402_13365_349_8153'>Can complete most tasks fully autonomously</span></div>
                    </div>
                </div>
            </div>
        </div>

        <div class='e2504_57144'>
          <button type='button'
            class='ei2504_57144_50_1522'
            onClick={issueFeadback}
            >
              Confirm
            </button>
        </div>
    </div>
</div>
  )
}