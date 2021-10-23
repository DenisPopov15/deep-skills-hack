// import CeramicClient from '@ceramicnetwork/http-client'
// import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
// import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect'
// import { TileDocument } from '@ceramicnetwork/stream-tile'
// import { DataModel } from '@glazed/datamodel'
// import { DIDDataStore } from '@glazed/did-datastore'
// import { DID } from 'dids'
// import { ModelManager } from '@glazed/devtools'
// import { model as basicProfileModel } from '@datamodels/identity-profile-basic'
// import { model as cryptoAccountsModel } from '@datamodels/identity-accounts-crypto'
// import { model as webAccountsModel } from '@datamodels/identity-accounts-web'
// import { deepSkillsModel } from '../models/index'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../../styles/App.module.css'
import { CeramicService } from '../services/CeramicService'
import { DeepSkillsService } from '../services/DeepSkillsService'

import { model as basicSkillsModel} from '@ben-razor/basic-skills'

function DataModels(props) {
    const [published, setPublished] = useState();
    const [schemaURL, setSchemaURL] = useState();
    const [dataStore, setDataStore] = useState();
    const [skills, setSkills] = useState();
    const [submitting, setSubmitting] = useState(false);
    const ceramic = props.ceramic;
    const ethereum = props.ethereum;
    const setAppStarted = props.setAppStarted;

    const [skillName, setSkillName] = useState('');
    const [skillID, setSkillID] = useState('');
    const [skillDesc, setSkillDesc] = useState('');
    const [skillImageURL, setSkillImageURL] = useState('');
    const [skillData, setSkillData] = useState({});

    const [loadingMessage, setLoadingMessage] = useState('Loading...');
    const [debug, setDebug] = useState(false);
    const [entryTab, setEntryTab] = useState('simple');

    const [verifiedSkillText, setVerifiedSkillText] = useState('');

    useEffect(() => {
        if(ceramic) {
            setLoadingMessage('Loading your skills...');

            (async() => {
                const ceramicService = new CeramicService(ceramic)
                const deepSkillsService = new DeepSkillsService(ceramic, ethereum)
                const { model, publishedModel, dataStore: _dataStore } = await ceramicService.buildDataModelStore(basicSkillsModel)

                setPublished(publishedModel)

                const schemaURL = model.getSchemaURL('BasicSkills')
                setDataStore(_dataStore)
                setSchemaURL(schemaURL)

                const uniqSuffix = Date.now()
                await deepSkillsService.issueAndStoreDocument({ text: `Some Text - ${uniqSuffix}` })

                const issuedDocuments = await deepSkillsService.pullHolderDeepSkills('holderDid')

                console.log('issuedDocuments!!!', issuedDocuments)

                const allSkills = await ceramicService.getStoreData(_dataStore, 'basicSkills')
                if(!allSkills) {
                    allSkills = { skills: [] }
                }

                setSkills(allSkills.skills.reverse());

                setLoadingMessage('');
            })();
        }
    }, [ceramic, setPublished]);

    function displaySkill(allSkills) {
        let skillRecords = [];

        let key = 0;
        let noImageURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAeIAAAHiAErNLpZAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABVtJREFUaIHtmt1rE1kYh5/JpDUUN02mqV/UgEGzpSKCSIuipCxNqtKmCd7oleCFpUv0cpe9279AVLARUUGvREQm9UIqFCKErrVGxCJSKbkyxVhrE2qrbdrJXsQOSZpqvhulD5yLvGcy5/fjPXPmPTMD6dQD/wAjQBRIVFmLAk+/aaxnDRzAVBWIzbV9ADqymYhXgbh822KqmfqfLBPZMqPXAn8CptT0uFwunE4nJlNaeN35+PEjPp8Pn8+XGm4E+gSSF3brStTtdnPhwoUKS8yPS5cuZZp5qgGsqRGn01lRUYXQ09OTGfpdAxhSI0ajsWKCCkWSpMyQUbMeQsrBhpFqoyRGHjx4QDQazdoXi8UyV5iyUBIj79+/58aNG8zOzq7qSyQSLC4ulmKY71ISI6Iocu7cOa5fv878/PwPj5+fn2d6eroUQ6toS3UivV7P2bNn8Xq9eDweNm3atOoYRVG4desWkFzm3717R2dnJ83NzUWPXzIjkBR35swZ+vv78Xg81NTUpPUPDAzQ1tbGvn37gOS0u3btGmazmbq6uqLGLvmqZTKZOH36NP39/SwtLaX1hcNh1QSAIAjYbDbGxsaKHrcsy++2bds4efIkXq+X5eVlNa7Vrp4Ay8vLiKJY9Jhlu480NTXR1dXFzZs31ZjFYmF0dFT9rSgKfr8/LUuFUtJrJJNdu3bhdruZmJgAwG63c//+fUZHR9m8eTOxWIyurq6sC0O+CCQ3JyqyLFNfv+Z2uCASiQSCIKTFFhYWCjYQi8VwuVxpsYqUKJkmgJJkIZWNWqva2DBSbeRkZG5ujmAwWG4tRZGTka9fvxIKhcqtpSh+mamV9519YGCA1tZWZFkmHo/T19fH4OAgoVAIu92uluSBQIDXr18Tj8dxOBxYrcmnTolEAp/PRzgcRqvV4na7GRkZobu7G4BgMMjw8DAajQar1Yrdbi+PkcnJSR4/fkxvby/Pnj3j8uXLHD9+nBMnTuD1elUjGo2G3t5eFEXhypUrmM1mdDodsixjtVpxuVwsLS1x+/ZttUqemJhgbGyM8+fPAzA0NITf76e9vf2HuvKeWvF4HJvNhiAI7Nmzh8+fP9PS0oIgCNTW1qrHHT58mHg8TiQSwWKx8PbtWwCi0Sh79+4FktXwsWPH1K3wo0ePaG5uJhgMEgwGMRgMBAKBnHTlnZGamhrMZjOAmv4VFEUBklvZO3fuYDKZ2LlzJ6Ioqvv5zJK9oaFh1flTyayp1iJvI4IgpNVO2eqoJ0+e4HA4sFgsAAwODqp9X758QVEUNJrkZHj+/Ll6ju3bt7N161aampqA5F4lEomUx0gu7N69G7/fjyiKvHr1img0qhaJnZ2dXL16FYfDQTgcZnp6Wu3r7u7m4sWLtLe3U1dXx9DQUM4ZEYF/UwOnTp1Cp9OlHaTVapEkCb1ejyRJ6vNhURSRJEkt+41GI0ajkYaGBiRJYnx8nP3793Pw4EF0Oh16vR6DwUBLSwtv3rxhx44dHDlyhJcvX3LgwAG0Wi2HDh1icnKSubk5enp62LJlyyrRCwsL3L17Ny1Wkf3I93jx4gWzs7PYbLac/7Nu+5FUEokE9+7dIxQKMTw8TCAQ4OjRo0Wft+JGBEHAbrcTCoWora3F4/GoF34xlHXPvhZGo5GOjlUvZIvil6m1NoxUGxqSn0WozMzMrJOU3MnyJH9GA4ynRmRZrpigQsmicVwL+IC2lcjK2yWn00ljY2PFxOXC1NQUsizz8OHDzC4Zkp9wfGD9P8UotEUA/YqjDpIfqKy3qHzbIvBHZno6frLMRLKZWEEP/A38B3yqArGZ7dM3bX8Bv6UK/x9QCQHJsosSgwAAAABJRU5ErkJggg==';
        for(let skillDetails of allSkills) {
            let imageURLWithDefault = skillDetails.image || noImageURL;
            let skillPanel = <div className={styles.csnSkillRecord} key={key}>
                <div className={styles.csnSkillRecordLeft}>
                    <div className={styles.csnSkillImage}>
                        <img alt={"Image for skill " + skillDetails.name} src={imageURLWithDefault} width="50" height="50" />
                    </div>
                </div>
                <div className={styles.csnSkillRecordRight}>
                    <div className={styles.csnSkillName}>
                        {skillDetails.name}
                    </div>
                    <div className={styles.csnSkillDesc}>
                        {skillDetails.description}
                    </div>
                </div>
            </div>;
            skillRecords.push(skillPanel);
            key++;
        }
        return skillRecords;
    }

    function handleSkillsSubmit(e) {
        setLoadingMessage('Updating skills...')
        let t = setTimeout(() => {
            setLoadingMessage('')
        }, 20000);

        let skillData = {
            name: skillName,
            id: skillID,
            description: skillDesc
        }

        if(skillImageURL) {
            skillData.image = skillImageURL;
        }

        if(dataStore && skillData && Object.keys(skillData).length) {
            (async() => {
                let allSkills = await dataStore.get('basicSkills');
                if(!allSkills) {
                    allSkills = { skills: [] }
                }

                let date = new Date().toISOString();

                let _skillData = { ...skillData };
                _skillData.issuedDate = date;

                allSkills.skills.push(_skillData);
                await dataStore.set('basicSkills', allSkills);

                setSkills(allSkills.skills.reverse());
                setLoadingMessage('');
                clearTimeout(t);
            })();
        }

        e.preventDefault();
    }

    function getSimpleSkillForm() {
        return <form onSubmit={e => handleSkillsSubmit(e)}>
        <div className={styles.csnFormRow}>
            <div className={styles.csnFormLabel}>
            Skill
            </div>
            <div className={styles.csnFormInput}>
            <input type="text" name="skill-name" value={skillName} onChange={e => setSkillName(e.target.value)} />
            </div>
        </div>
        <div className={styles.csnFormRow}>
            <div className={styles.csnFormLabel}>
            ID
            </div>
            <div className={styles.csnFormInput}>
            <input type="text" name="skill-id" value={skillID} onChange={e => setSkillID(e.target.value)} />
            </div>
        </div>
        <div className={styles.csnFormRow}>
            <div className={styles.csnFormLabel}>
            Description
            </div>
            <div className={styles.csnFormInput}>
            <textarea name="skill-desc" value={skillDesc} onChange={e => setSkillDesc(e.target.value)} rows={4}>
            </textarea>
            </div>
        </div>
        <div className={styles.csnFormRow}>
            <div className={styles.csnFormLabel}>
            Image URL
            </div>
            <div className={styles.csnFormInput}>
            <input type="text" name="skill-image-url" value={skillImageURL} onChange={e => setSkillImageURL(e.target.value)} />
            </div>
        </div>
        <div className={styles.csnFormRow}>
            <input type="submit" name="submit" value="submit" />
        </div>

        </form>
    }

    function submitVerifiedSkill(e) {
        setLoadingMessage('Updating skills...')
        let t = setTimeout(() => {
            setLoadingMessage('')
        }, 20000);

        try {
            let verfiedSkill = JSON.parse(verifiedSkillText);

            (async() => {
                try {
                    let allSkills = await dataStore.get('basicSkills');
                    if(!allSkills) {
                        allSkills = { skills: [] }
                    }

                    let date = new Date().toISOString();

                    let _skillData = { ...verfiedSkill };
                    _skillData.issuedDate = date;

                    allSkills.skills.push(_skillData);
                    await dataStore.set('basicSkills', allSkills);

                    setSkills(allSkills.skills.reverse());
                    setLoadingMessage('')
                }
                catch(e) {
                    console.log(e);
                }
                finally {
                    clearTimeout(t);
                }

            })();

        }
        catch(e) {
            console.log(e);
            setLoadingMessage('')
        }
        finally {
            clearTimeout(t);
        }
        e.preventDefault();
    }

    function getSkillsPage() {

        let logo = <Image  onClick={e => setAppStarted(false)} alt="Job Slap Logo" title="Job Slap Logo" width="160" height="120" layout="intrinsic" src="/job-slap-1-200.png" />

        let skillsContent =
        <div className={styles.csnSkillsPage}>
            <div className={styles.csnSkillsPageHeadingRow}>
                <div onClick={e => setAppStarted(false)}>
                {logo}
                </div>
            </div>
            <div className={styles.csnSkillsPageMainRow}>
                { loadingMessage &&
                    <div className={styles.csnOverlay}>
                        <div className={styles.csnOverlayContent}>
                            <div className={styles.csnOverlayTextUpper}>
                                    <h3>{loadingMessage}</h3>
                            </div>
                            <div className={styles.csnOverlayLoader}>
                                <Image alt="Loader" src="/infinity-loader.gif" width="200" height="200" />
                            </div>
                            <div className={styles.csnOverlayTextLower}>

                            </div>
                        </div>
                    </div>
                }

                <div className={styles.csnSkillsFormContainer }>
                    <div className={styles.csnSkillsFormContainerContent}>
                        <div>
                            <div className={styles.csnSkillsEntryTabs}>
                                <div onClick={e => setEntryTab('simple')} className={styles.csnSkillsEntryTab + ' ' + (entryTab === 'simple' && styles.csnSkillsEntryTabActive)}>
                                    Enter Skill
                                </div>
                                <div onClick={e => setEntryTab('upload')} className={styles.csnSkillsEntryTab + ' ' + (entryTab !== 'simple' && styles.csnSkillsEntryTabActive)}>
                                    Upload
                                </div>
                            </div>

                            <div style={{display: entryTab === 'simple' ? 'block' : 'none'}}>
                                {getSimpleSkillForm()}
                            </div>
                            <div style={{display: entryTab !== 'simple' ? 'block' : 'none'}}>
                                <h3>Upload verified skills</h3>
                                <form onSubmit={e => submitVerifiedSkill(e)}>
                                    <textarea className={styles.csnVerfiedSkillEntry} rows="20" value={verifiedSkillText} onChange={e => setVerifiedSkillText(e.target.value)}>

                                    </textarea>
                                    <input type="submit" name="submit" value="Upload" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.csnSkillsContainer }>
                    <div className={styles.csnSkillsContainerHeading}>
                        <h1>Your Skills</h1>
                    </div>
                    <div className={styles.csnSkillsContainerContent}>
                        <div className="data-models">
                            { debug &&
                                <div>
                                    <div>
                                        {JSON.stringify(published)}
                                    </div>
                                    <div>
                                        Schema URL: {schemaURL}
                                    </div>
                                </div>
                            }
                            <div>
                                { (skills && skills.length)  ?
                                    displaySkill(skills) :
                                    <h3>You need to add some skills!</h3>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        return skillsContent;
    }

    return getSkillsPage();
}

export default DataModels;
