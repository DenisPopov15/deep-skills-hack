import { useEffect, useState } from 'react'
import { DeepSkillsService } from '../services/DeepSkillsService'

export default function profile(props) {
  const ceramic = props.ceramic
  const ethereum = props.ethereum

  const [skills, setSkills] = useState()

  useEffect(() => {
      if(ceramic) {
          // setLoadingMessage('Loading your skills...');

          (async() => {
              const holderDid = 'did:3:kjzl6cwe1jw149u7xahdzwu6nsuwnf8iygdv0b7sbfwr3hyospdcx5ila6pvwc0'
              const deepSkillsService = new DeepSkillsService(ceramic, ethereum)
              const issuedDocuments = await deepSkillsService.pullHolderDeepSkills(holderDid)

              setSkills(issuedDocuments.reverse())

              // setLoadingMessage('');
          })();
      }
  }, [ceramic])


  function displaySkill(allSkills) {
    const skillRecords = []
    for (const record of allSkills) {
      const renderRecord = <div>
        Task name: <span class='e2512_513600'>{record.taskname}</span><br />
        Comments: : <span class='e2512_513600'>{record.description}</span><br />
        Attested by: {record.issuerDid} <br />
        Singature: <span class='e2512_513600'>{record.signature}</span><br />
        <br /><br /><br />
      </div>;

      skillRecords.push(renderRecord)
    }

    return skillRecords
  }

  return (
    <div class='e2504_57287'>
        <div class='e2504_57288'></div>
        <div class='e2504_57289'><span class='e2504_57290'>Skills</span>
            <div class='e2504_57291'>
                <div class='e2529_75842'>
                    <div class='e2529_75843'></div>
                    <span class='e2529_75846'>
                      {
                        (skills)  ?
                        skills.length :
                        <div>Loading...</div>
                      }
                    </span>
                    <span class='e2529_75847'>Taco Chef</span></div>
                <div class='e2528_75462'>
                    <div class='e2528_75463'></div><span class='e2528_75466'>0</span><span class='e2528_75467'>Product Design</span></div>
            </div>
        </div>
        <div class='e2504_57295'>
            <div class='e2504_57296'><span class='e2504_57297'>Stepa G</span><span class='e2504_57298'>Visual artist, like working on design.</span></div>
            <div class='e2504_57299'><span class='ei2504_57299_1320_25650'>Follow</span></div>
            <div class='e2504_57300'>
                <div class='e2504_57301'>
                    <div class='ei2504_57301_311_6649'>
                        <div class='ei2504_57301_311_6650'></div>
                        <div class='ei2504_57301_311_6651'></div>
                    </div><span class='ei2504_57301_311_6642'>stepa.eth</span></div>
                <div class='e2504_57302'>
                    <div class='ei2504_57302_311_6661'>
                        <div class='ei2504_57302_311_6662'></div>
                        <div class='ei2504_57302_311_6663'></div>
                    </div><span class='ei2504_57302_311_6660'>andrej@protonmail.com</span></div>
            </div>
        </div>
        <div class='e2504_57303'>
            <div class='e2504_57304'></div>
        </div>
        <div class='e2504_57305'></div>
        <div class='e2504_57306'></div>
        <div class='e2504_57307'><span class='e2504_57308'>Skills</span><span class='e2504_57309'>2</span></div>
        <div class='e2504_57310'><span class='e2504_57311'>Projects</span><span class='e2504_57312'>3</span></div>
        <div class='e2504_57313'><span class='e2504_57314'>Coworkers</span><span class='e2504_57315'>3</span></div>
        <div class='e2504_57316'><span class='e2504_57317'>Coworkers</span>
            <div class='e2504_57318'>
                <div class='e2504_57319'>
                    <div class='e2504_57320'>
                        <div class='ei2504_57320_1287_27646'></div>
                    </div><span class='e2504_57321'>Andrej Berlin</span></div>
                <div class='e2504_57322'>
                    <div class='e2504_57323'>
                        <div class='ei2504_57323_1287_27646'></div>
                    </div><span class='e2504_57324'>Charlie Ellington</span></div>
                <div class='e2504_57325'>
                    <div class='e2504_57326'>
                        <div class='ei2504_57326_1287_27646'></div>
                    </div><span class='e2504_57327'>Vikrant Patankar</span></div>
            </div>
        </div>
        <div class='e2512_51308'>
            <div class='e2512_51309'></div>
            <div class='e2512_51311'></div>
            <div class='e2512_51341'>
                <div class='e2512_51354'>
                    <div class='e2512_51355'></div>
                    <div class='e2512_51356'></div>
                </div>
                <div class='e2512_51343'><span class='e2512_51344'>Taco DAO</span></div>
            </div>
            <div class='e2512_51358'><span class='e2512_51359'>TacoLisbon Event</span><span class='e2512_51360'>Aug 5 – Aug 13, 2021</span>
                <div class='e2512_51361'><span class='ei2512_51361_311_6960'>Food Industry</span></div>
            </div>
            <div class='e2512_513588'><div class='e2512_513611'>Tasks Completed</div></div>

            <div class='newblock'>
            { (skills)  ?
                displaySkill(skills) :
                <h3>Loading...</h3>
            }
            </div>

        </div>
        <div class='e2504_57333'>
            <div class='ei2504_57333_1422_29090'></div>
            <div class='ei2504_57333_1422_29107'><span class='ei2504_57333_1422_29108'><a href="/issuers">Organisations</a></span><span class='ei2504_57333_1422_29109'>Explore Projects</span>
                <div class='ei2504_57333_1422_29110'>
                    <div class='ei2504_57333_1422_29110_1287_27650'></div>
                </div>
            </div>
        </div>
    </div>
  )
}