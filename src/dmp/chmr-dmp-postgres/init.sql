

CREATE DATABASE chmr_dmp
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

\c chmr_dmp

DROP TABLE IF EXISTS chmr_assessment;
CREATE TABLE chmr_assessment
( 
	id                   	UUID DEFAULT gen_random_UUID()
	,public_assessment_id 	UUID NOT NULL
	,initial_review_id 		UUID NOT NULL
	,assessor_id 			UUID NOT NULL
	,observation_id 		UUID NOT NULL
	,title					VARCHAR(255)  NOT NULL
	,summary 				TEXT  NOT NULL
	,key_obs_lessons_learned TEXT  NOT NULL
	,recommended_mitigations TEXT  NOT NULL
	,criminality_type		SMALLINT  NOT NULL
	,more_likely_than_not	BOOLEAN  NOT NULL
	,recommendation			TEXT  NOT NULL
	,status					SMALLINT  NOT NULL
	,approver_remarks		TEXT  NOT NULL
	,info_ctrl_id 			UUID NOT NULL
	,owner_id				UUID	 NULL
	,releasable				BOOLEAN  NOT NULL
	,created_datetime		TIMESTAMP  NOT NULL
	,created_person_id		UUID NOT NULL
	,last_accessed_datetime TIMESTAMP  NOT NULL
	,last_accessed_person_id UUID NOT NULL
);

DROP TABLE IF EXISTS chmr_associated_information CASCADE;
CREATE TABLE chmr_associated_information
( 
	 id						UUID	NOT NULL
	,info_ctrl_id 			UUID 	NOT NULL
	,owner_id				UUID	NOT NULL
	,information_id			UUID	NOT NULL
	,created_datetime		TIMESTAMP	NOT NULL
	,created_person_id		UUID	NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id UUID	NOT NULL	
);

DROP TABLE IF EXISTS chmr_associated_operation;
CREATE TABLE chmr_associated_operation
( 
	 id						UUID	NOT NULL
	,report_id				UUID	NOT NULL
	,operation_id			UUID	NOT NULL
	,created_datetime		TIMESTAMP	NOT NULL
	,created_person_id		UUID	NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id UUID	NOT NULL	
);

DROP TABLE IF EXISTS chmr_associated_platform;
CREATE TABLE chmr_associated_platform
( 
	 id						UUID	NOT NULL
	,operation_id			UUID	NOT NULL
	,platform_id			UUID	NOT NULL
	,created_datetime		TIMESTAMP	NOT NULL
	,created_person_id		UUID	NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id UUID	NOT NULL
);

DROP TABLE IF EXISTS chmr_associated_report;
CREATE TABLE chmr_associated_report
( 
	 id						UUID		NOT NULL
	,info_ctrl_id			UUID		NOT NULL
	,owner_id				UUID		NOT NULL
	,report_id				UUID		NOT NULL
	,has_more_us_info		BOOLEAN 	NOT NULL	
	,created_datetime		TIMESTAMP	NOT NULL	
	,created_person_id		UUID		NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL	
	,last_accessed_person_id UUID		NOT NULL
);

DROP TABLE IF EXISTS chmr_associated_user_group;
CREATE TABLE chmr_associated_user_group
( 
	id						UUID	NOT NULL
	,person_id				UUID	NOT NULL
	,user_group_id			UUID	NOT NULL
	,created_datetime		TIMESTAMP	NOT NULL
	,created_person_id		UUID	NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id	UUID	NOT NULL
);

DROP TABLE IF EXISTS chmr_associated_user_role;
CREATE TABLE chmr_associated_user_role
( 
	 id	UUID	NOT NULL
	,user_role_id	UUID	NOT NULL
	,user_group_id	UUID	NOT NULL
	,create_permission	BOOLEAN 	NOT NULL
	,update_permission	BOOLEAN 	NOT NULL
	,delete_permission	BOOLEAN 	NOT NULL
	,created_datetime	TIMESTAMP	NOT NULL
	,created_person_id	UUID	NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id	UUID	NOT NULL
);

DROP TABLE IF EXISTS chmr_associated_weapon;
CREATE TABLE chmr_associated_weapon
( 
	 id						UUID	NOT NULL
	,info_ctrl_id			UUID	NOT NULL
	,owner_id				UUID	NOT NULL
	,weapon_id				UUID	NOT NULL
	,created_datetime		TIMESTAMP	NOT NULL
	,created_person_id		UUID	NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id UUID	NOT NULL
);

DROP TABLE IF EXISTS chmr_decision;
CREATE TABLE chmr_decision
( 
	 id						UUID	NOT NULL
	,review_assess_id		UUID	NOT NULL
	,review_approp_conducted	BOOLEAN 	NOT NULL
	,results_consistent		BOOLEAN 	NOT NULL
	,dodi_criteria_met		BOOLEAN 	NOT NULL
	,approval_status		SMALLINT	NOT NULL
	,approver_id			UUID	NOT NULL
	,approver_remarks		TEXT	NOT NULL
	,created_datetime		TIMESTAMP	NOT NULL
	,created_person_id		UUID	NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id UUID	NOT NULL
);

DROP TABLE IF EXISTS chmr_info_control;
CREATE TABLE chmr_info_control
( 
	 id						UUID		NOT NULL
	,owner_id				UUID		NOT NULL
	,has_pii				BOOLEAN 	NOT NULL
	,has_phi				BOOLEAN 	NOT NULL
	,security_classification	VARCHAR(20)	NOT NULL
	,created_datetime		TIMESTAMP	NOT NULL
	,created_person_id		UUID		NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id UUID		NOT NULL
	--,PRIMARY KEY (id)
);

DROP TABLE IF EXISTS chmr_information_source;
CREATE TABLE chmr_information_source
( 
	 id						UUID		NOT NULL
	,title					VARCHAR(255)	NOT NULL
	,poc_name_contact		VARCHAR(300)	NULL
	,inclusion_rationale	TEXT		NOT NULL
	,uploaded_file_reference	VARCHAR(2048)	NULL
	,information_url		VARCHAR(2083)	NULL
	,info_ctrl_id			UUID		NOT NULL
	,owner_id				UUID		NULL
	,created_datetime		TIMESTAMP	NOT NULL
	,created_person_id		UUID		NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id UUID		NOT NULL
);

DROP TABLE IF EXISTS chmr_initial_review;
CREATE TABLE chmr_initial_review
( 
	id                   	UUID DEFAULT gen_random_UUID()
	,public_review_id		UUID NOT NULL
	,reviewer_id			UUID NOT NULL
	,observation_id			UUID NOT NULL
	,title					VARCHAR(255) NOT NULL
	,summary				TEXT NOT NULL
	,recommendation			SMALLINT NOT NULL
	,status					SMALLINT NOT NULL
	,approver_remarks		TEXT NULL
	,info_ctrl_id			UUID NOT NULL
	,owner_id				UUID	 NULL
	,releasable				bool NOT NULL
	,created_datetime		TIMESTAMP  NOT NULL
	,created_person_id		UUID NOT NULL
	,last_accessed_datetime TIMESTAMP  NOT NULL
	,last_accessed_person_id UUID NOT NULL
);

DROP TABLE IF EXISTS chmr_investigation;
CREATE TABLE chmr_investigation
( 
	 id						UUID	NOT NULL
	,public_investigation_id	UUID	NOT NULL
	,review_assess_id		UUID	NOT NULL
	,investigator_id		UUID	NOT NULL
	,observation_id			UUID	NOT NULL
	,title					VARCHAR(128)	NOT NULL
	,summary				TEXT	NOT NULL
	,key_obs_lessons_learned	TEXT	NOT NULL
	,recommended_mitigations	TEXT	NOT NULL
	,criminality_type		SMALLINT	NOT NULL
	,more_likely_than_not	BOOLEAN 	NOT NULL
	,status					SMALLINT	NOT NULL
	,investigator_remarks	TEXT	NULL
	,info_ctrl_id			UUID	NOT NULL
	,owner_id				UUID		NULL
	,releasable				BOOLEAN 	NOT NULL
	,created_datetime		TIMESTAMP	NOT NULL
	,created_person_id		UUID	NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id UUID	NOT NULL
);

DROP TABLE IF EXISTS chmr_observation;
CREATE TABLE chmr_observation
( 
	 id	UUID	NOT NULL
	,start_datetime			TIMESTAMP	NOT NULL
	,end_datetime			TIMESTAMP	NULL
	,time_zone				VARCHAR(64)	NOT NULL
	,location				VARCHAR(255)	NOT NULL
	,total_harm				TEXT	NOT NULL
	,us_harm				TEXT	NOT NULL
	,deaths_estimate		INT	NULL
	,deaths_upper_bound		INT	NULL
	,deaths_lower_bound		INT	NULL
	,injuries_estimate		INT	NULL
	,injuries_upper_bound	INT	NULL
	,injuries_lower_bound	INT	NULL
	,created_datetime		TIMESTAMP	NOT NULL
	,created_person_id		UUID	NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id UUID	NOT NULL
);

DROP TABLE IF EXISTS chmr_person;
CREATE TABLE chmr_person
( 
	 id						UUID   NOT NULL	
	,full_name				VARCHAR(128)	NULL
	,given_name				VARCHAR(50)	NULL
	,surname				VARCHAR(50)	NULL
	,assigned_unit			VARCHAR(50)	NULL
	,reporting_unit			VARCHAR(50)	NULL
	,dod_id					INT	NULL
	,duty_title				VARCHAR(50)	NULL
	,duty_type				VARCHAR(4)	NULL
	,rank					VARCHAR(24)	NULL
	,phone_commercial		VARCHAR(16)	NULL
	,dsn_phone				VARCHAR(12)	NULL
	,email					VARCHAR(320)	NULL
	,combatant_command		VARCHAR(16)	NULL
	,other_command			VARCHAR(16)	NULL
	,is_system_user			BOOLEAN	NOT NULL
	,created_datetime		TIMESTAMP  NOT NULL
	,created_person_id		UUID NOT NULL
	,last_accessed_datetime TIMESTAMP  NOT NULL
	,last_accessed_person_id UUID NOT NULL
);

DROP TABLE IF EXISTS chmr_platform;
CREATE TABLE chmr_platform
( 
	 id						UUID	NOT NULL
	,ain					VARCHAR(255)	NOT NULL
	,descriptive_details	TEXT	NULL
	,type					VARCHAR(255)	NOT NULL
	,locations				TEXT	NOT NULL
	,commanding_unit		VARCHAR(255)	NULL
	,info_ctrl_id			UUID	NOT NULL
	,owner_id				UUID		NULL
	,created_datetime		TIMESTAMP	NOT NULL
	,created_person_id		UUID	NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id UUID	NOT NULL
);

DROP TABLE IF EXISTS chmr_report;
CREATE TABLE chmr_report
( 
	 id						UUID	NOT NULL
	,public_report_id		UUID	NOT NULL
	,report_origin			SMALLINT	NOT NULL
	,confidence_level		SMALLINT	NOT NULL
	,report_status			SMALLINT	NOT NULL
	,reporter_person_id		UUID	NOT NULL
	,full_name				VARCHAR(128)	NULL
	,phone_commercial		VARCHAR(16)	NULL
	,email					varchar(320)	NULL
	,observation_id			UUID	NOT NULL
	,poc1_name				VARCHAR(300)	NULL
	,poc1_info				VARCHAR(500)	NULL
	,poc2_name				VARCHAR(300)	NULL
	,poc2_info				VARCHAR(500)	NULL
	,created_datetime		TIMESTAMP	NOT NULL
	,created_person_id		UUID		NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id UUID		NOT NULL
);

DROP TABLE IF EXISTS chmr_us_military_operation;
CREATE TABLE chmr_us_military_operation
( 
	 id						UUID	NOT NULL
	,ext_identification		TEXT	NULL
	,description			TEXT	NULL
	,was_kinetic			BOOLEAN 	NOT NULL
	,was_operational		BOOLEAN 	NOT NULL
	,had_air_domain			BOOLEAN 	NOT NULL
	,had_cyber_domain		BOOLEAN 	NOT NULL
	,had_ground_domain		BOOLEAN 	NOT NULL
	,had_maritime_domain	BOOLEAN 	NOT NULL
	,had_other_domain		BOOLEAN 	NOT NULL
	,ally_partner_involved	BOOLEAN 	NOT NULL
	,non_state_involved		BOOLEAN 	NOT NULL
	,other_involved			VARCHAR(255)	NULL
	,tactical_method 		INT	NOT NULL
	,was_direct_fire		BOOLEAN 	NULL
	,commanding_unit		VARCHAR(255)	NULL
	,ops_start_datetime		TIMESTAMP	NOT NULL
	,ops_end_datetime		TIMESTAMP	NULL
	,locations				TEXT	NULL
	,participating_units	TEXT	NULL
	,info_ctrl_id			UUID	NOT NULL
	,owner_id				UUID		NULL
	,created_datetime		TIMESTAMP	NOT NULL
	,created_person_id		UUID	NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id UUID	NOT NULL	
);

DROP TABLE IF EXISTS chmr_user_group;
CREATE TABLE chmr_user_group
( 
	 id                   UUID  NOT NULL
	,name                 VARCHAR(32)  NOT NULL
	,created_datetime	  TIMESTAMP  NOT NULL
	,created_person_id	  UUID NOT NULL
	,last_accessed_datetime TIMESTAMP  NOT NULL
	,last_accessed_person_id UUID NOT NULL
);

DROP TABLE IF EXISTS chmr_user_role;
CREATE TABLE chmr_user_role
( 
	 id						UUID	NOT NULL
	,name					VARCHAR(32)	NOT NULL
	,created_datetime		TIMESTAMP	NOT NULL
	,created_person_id		UUID	NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id UUID	NOT NULL
);

DROP TABLE IF EXISTS chmr_weapon;
CREATE TABLE chmr_weapon
( 
	 id						UUID	NOT NULL
	,ain					VARCHAR(255)	NOT NULL
	,model					VARCHAR(255)	NOT NULL
	,type					VARCHAR(255)	NOT NULL
	,caliber				VARCHAR(128)	NULL
	,munition_type			VARCHAR(128)	NULL
	,weapon_description		VARCHAR(255)	NULL
	,targeting_description	VARCHAR(255)	NULL
	,INTended_target_location	VARCHAR(255)	NULL
	,weapon_location		VARCHAR(255)	NULL
	,estimated_rounds_fired	INT	NOT NULL
	,info_ctrl_id			UUID	NOT NULL
	,owner_id				UUID		NULL
	,created_datetime		TIMESTAMP	NOT NULL
	,created_person_id		UUID	NOT NULL
	,last_accessed_datetime	TIMESTAMP	NOT NULL
	,last_accessed_person_id UUID	NOT NULL
);

ALTER TABLE chmr_assessment	ADD CONSTRAINT 	KPKchmr_chmr_assessment PRIMARY KEY (id);
ALTER TABLE chmr_associated_information	ADD CONSTRAINT 	KPKchmr_chmr_associated_information PRIMARY KEY (id);
ALTER TABLE chmr_associated_operation	ADD CONSTRAINT 	KPKchmr_chmr_associated_operation PRIMARY KEY (id);
ALTER TABLE chmr_associated_platform	ADD CONSTRAINT 	KPKchmr_chmr_associated_platform PRIMARY KEY (id);
ALTER TABLE chmr_associated_report	ADD CONSTRAINT 	KPKchmr_chmr_associated_report PRIMARY KEY (id);
ALTER TABLE chmr_associated_user_group	ADD CONSTRAINT 	KPKchmr_chmr_associated_user_group PRIMARY KEY (id);
ALTER TABLE chmr_associated_user_role	ADD CONSTRAINT 	KPKchmr_chmr_associated_user_role PRIMARY KEY (id);
ALTER TABLE chmr_associated_weapon	ADD CONSTRAINT 	KPKchmr_chmr_associated_weapon PRIMARY KEY (id);
ALTER TABLE chmr_decision	ADD CONSTRAINT 	KPKchmr_chmr_decision PRIMARY KEY (id);
ALTER TABLE chmr_info_control	ADD CONSTRAINT 	KPKchmr_chmr_info_control PRIMARY KEY (id);
ALTER TABLE chmr_information_source	ADD CONSTRAINT 	KPKchmr_chmr_information_source PRIMARY KEY (id);
ALTER TABLE chmr_initial_review	ADD CONSTRAINT 	KPKchmr_chmr_initial_review PRIMARY KEY (id);
ALTER TABLE chmr_investigation	ADD CONSTRAINT 	KPKchmr_chmr_investigation PRIMARY KEY (id);
ALTER TABLE chmr_observation	ADD CONSTRAINT 	KPKchmr_chmr_observation PRIMARY KEY (id);
ALTER TABLE chmr_person	ADD CONSTRAINT 	KPKchmr_chmr_person PRIMARY KEY (id);
ALTER TABLE chmr_platform	ADD CONSTRAINT 	KPKchmr_chmr_platform PRIMARY KEY (id);
ALTER TABLE chmr_report	ADD CONSTRAINT 	KPKchmr_chmr_report PRIMARY KEY (id);
ALTER TABLE chmr_us_military_operation	ADD CONSTRAINT 	KPKchmr_chmr_us_military_operation PRIMARY KEY (id);
ALTER TABLE chmr_user_group ADD CONSTRAINT KPKchmr_user_group PRIMARY KEY (id);
ALTER TABLE chmr_user_role	ADD CONSTRAINT 	KPKchmr_chmr_user_role PRIMARY KEY (id);
ALTER TABLE chmr_weapon	ADD CONSTRAINT 	KPKchmr_chmr_weapon PRIMARY KEY (id);

ALTER TABLE chmr_assessment
    ADD CONSTRAINT fk1_chmr_assessment FOREIGN KEY (initial_review_id) REFERENCES chmr_assessment(id);
ALTER TABLE chmr_assessment
    ADD CONSTRAINT fk2_chmr_assessment FOREIGN KEY (assessor_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_assessment
    ADD CONSTRAINT fk3_chmr_assessment FOREIGN KEY (observation_id) REFERENCES chmr_observation(id);
ALTER TABLE chmr_assessment
    ADD CONSTRAINT fk_chmr_assessment FOREIGN KEY (info_ctrl_id) REFERENCES chmr_info_control(id);
ALTER TABLE chmr_assessment
    ADD CONSTRAINT fk5_chmr_assessment FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_assessment
    ADD CONSTRAINT fk6_chmr_assessment FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);

ALTER TABLE chmr_associated_information
    ADD CONSTRAINT fk1_chmr_associated_information FOREIGN KEY (info_ctrl_id) REFERENCES chmr_info_control(id);
ALTER TABLE chmr_associated_information
    ADD CONSTRAINT fk2_chmr_associated_information FOREIGN KEY (information_id) REFERENCES chmr_information_source(id);
ALTER TABLE chmr_associated_information
    ADD CONSTRAINT fk3_chmr_associated_information FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_associated_information
    ADD CONSTRAINT fk4_chmr_associated_information FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);
	
ALTER TABLE chmr_associated_operation
    ADD CONSTRAINT fk1_chmr_associated_operation FOREIGN KEY (report_id) REFERENCES chmr_report(id);
ALTER TABLE chmr_associated_operation
    ADD CONSTRAINT fk2_chmr_associated_operation FOREIGN KEY (operation_id) REFERENCES chmr_us_military_operation(id);
ALTER TABLE chmr_associated_operation
    ADD CONSTRAINT fk3_chmr_associated_operation FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_associated_operation
    ADD CONSTRAINT fk4_chmr_associated_operation FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);

ALTER TABLE chmr_associated_platform
    ADD CONSTRAINT fk1_chmr_associated_platform FOREIGN KEY (operation_id) REFERENCES chmr_us_military_operation(id);
ALTER TABLE chmr_associated_platform
    ADD CONSTRAINT fk2_chmr_associated_platform FOREIGN KEY (platform_id) REFERENCES chmr_associated_platform(id);
ALTER TABLE chmr_associated_platform
    ADD CONSTRAINT fk3_chmr_associated_platform FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_associated_platform
    ADD CONSTRAINT fk4_chmr_associated_platform FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);

ALTER TABLE chmr_associated_report
    ADD CONSTRAINT fk1_chmr_associated_report FOREIGN KEY (info_ctrl_id) REFERENCES chmr_info_control(id);
ALTER TABLE chmr_associated_report
    ADD CONSTRAINT fk2_chmr_associated_report FOREIGN KEY (report_id) REFERENCES chmr_report(id);
ALTER TABLE chmr_associated_report
    ADD CONSTRAINT fk3_chmr_associated_report FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_associated_report
    ADD CONSTRAINT fk4_chmr_associated_report FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);
	
ALTER TABLE chmr_associated_user_group
    ADD CONSTRAINT fk1_chmr_associated_user_group FOREIGN KEY (person_id) REFERENCES chmr_user_role(id);
ALTER TABLE chmr_associated_user_group
    ADD CONSTRAINT fk2_chmr_associated_user_group FOREIGN KEY (user_group_id) REFERENCES chmr_user_group(id);
ALTER TABLE chmr_associated_user_group
    ADD CONSTRAINT fk3_chmr_associated_user_group FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_associated_user_group
    ADD CONSTRAINT fk4_chmr_associated_user_group FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);
	
ALTER TABLE chmr_associated_user_role
    ADD CONSTRAINT fk1_chmr_associated_user_role FOREIGN KEY (user_role_id) REFERENCES chmr_user_role(id);
ALTER TABLE chmr_associated_user_role
    ADD CONSTRAINT fk2_chmr_associated_user_role FOREIGN KEY (user_group_id) REFERENCES chmr_user_group(id);
ALTER TABLE chmr_associated_user_role
    ADD CONSTRAINT fk3_chmr_associated_user_role FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_associated_user_role
    ADD CONSTRAINT fk4_chmr_associated_user_role FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);	
	
ALTER TABLE chmr_associated_weapon
    ADD CONSTRAINT fk1_chmr_associated_weapon FOREIGN KEY (info_ctrl_id) REFERENCES chmr_info_control(id);
ALTER TABLE chmr_associated_weapon
    ADD CONSTRAINT fk2_chmr_associated_weapon FOREIGN KEY (weapon_id) REFERENCES chmr_weapon(id);
ALTER TABLE chmr_weapon
    ADD CONSTRAINT fk3_chmr_associated_weapon FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_associated_weapon
    ADD CONSTRAINT fk4_chmr_associated_weapon FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);
	
ALTER TABLE chmr_decision
    ADD CONSTRAINT fk1_chmr_decision FOREIGN KEY (review_assess_id) REFERENCES chmr_assessment(id);
ALTER TABLE chmr_decision
    ADD CONSTRAINT fk2_chmr_decision FOREIGN KEY (approver_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_decision
    ADD CONSTRAINT fk3_chmr_decision FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_decision
    ADD CONSTRAINT fk4_chmr_decision FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);
	
ALTER TABLE chmr_info_control
    ADD CONSTRAINT fk1_chmr_info_control FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_info_control
    ADD CONSTRAINT fk2_chmr_info_control FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);
	
ALTER TABLE chmr_information_source
    ADD CONSTRAINT fk1_chmr_information_source FOREIGN KEY (info_ctrl_id) REFERENCES chmr_info_control(id);
ALTER TABLE chmr_information_source
    ADD CONSTRAINT fk2_chmr_information_source FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_information_source
    ADD CONSTRAINT fk3_chmr_information_source FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);
	
ALTER TABLE chmr_initial_review
    ADD CONSTRAINT fk1_chmr_initial_review FOREIGN KEY (reviewer_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_initial_review
    ADD CONSTRAINT fk2_chmr_initial_review FOREIGN KEY (observation_id) REFERENCES chmr_observation(id);
ALTER TABLE chmr_initial_review
    ADD CONSTRAINT fk3_chmr_initial_review FOREIGN KEY (info_ctrl_id) REFERENCES chmr_info_control(id);
ALTER TABLE chmr_initial_review
    ADD CONSTRAINT fk4_chmr_initial_review FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_initial_review
    ADD CONSTRAINT fk5_chmr_initial_review FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);	
	
ALTER TABLE chmr_investigation
    ADD CONSTRAINT fk1_chmr_investigation FOREIGN KEY (review_assess_id) REFERENCES chmr_initial_review(id);
ALTER TABLE chmr_investigation
    ADD CONSTRAINT fk2_chmr_investigation FOREIGN KEY (investigator_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_investigation
    ADD CONSTRAINT fk3_chmr_investigation FOREIGN KEY (observation_id) REFERENCES chmr_observation(id);
ALTER TABLE chmr_investigation
    ADD CONSTRAINT fk4_chmr_investigation FOREIGN KEY (info_ctrl_id) REFERENCES chmr_info_control(id);
ALTER TABLE chmr_investigation
    ADD CONSTRAINT fk5_chmr_investigation FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_investigation
    ADD CONSTRAINT fk6_chmr_investigation FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);

ALTER TABLE chmr_observation
    ADD CONSTRAINT fk1_chmr_observation FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_observation
    ADD CONSTRAINT fk2_chmr_observation FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);
	
ALTER TABLE chmr_person
    ADD CONSTRAINT fk_chmr_person FOREIGN KEY (group_id) REFERENCES chmr_user_group(id);
	
ALTER TABLE chmr_platform
    ADD CONSTRAINT fk_chmr_platform FOREIGN KEY (info_ctrl_id) REFERENCES chmr_info_control(id);
ALTER TABLE chmr_platform
    ADD CONSTRAINT fk5_chmr_platform FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_platform
    ADD CONSTRAINT fk6_chmr_platform FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);
	
ALTER TABLE chmr_report
    ADD CONSTRAINT fk1_chmr_report FOREIGN KEY (reporter_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_report
    ADD CONSTRAINT fk2_chmr_report FOREIGN KEY (observation_id) REFERENCES chmr_observation(id);
ALTER TABLE chmr_report
    ADD CONSTRAINT fk3_chmr_report FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_report
    ADD CONSTRAINT fk4_chmr_report FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);
	
ALTER TABLE chmr_us_military_operation
    ADD CONSTRAINT fk1_chmr_us_military_operation FOREIGN KEY (info_ctrl_id) REFERENCES chmr_info_control(id);
ALTER TABLE chmr_us_military_operation
    ADD CONSTRAINT fk2_chmr_us_military_operation FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_us_military_operation
    ADD CONSTRAINT fk3_chmr_us_military_operation FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);

ALTER TABLE chmr_user_group
    ADD CONSTRAINT fk1_chmr_user_group FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_user_group
    ADD CONSTRAINT fk2_chmr_user_group FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);

ALTER TABLE chmr_user_role
    ADD CONSTRAINT fk1_chmr_user_role FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_user_role
    ADD CONSTRAINT fk2_chmr_user_role FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);

ALTER TABLE chmr_weapon
    ADD CONSTRAINT fk1_chmr_weapon FOREIGN KEY (info_ctrl_id) REFERENCES chmr_info_control(id);
ALTER TABLE chmr_weapon
    ADD CONSTRAINT fk2_chmr_weapon FOREIGN KEY (created_person_id) REFERENCES chmr_person(id);
ALTER TABLE chmr_weapon
    ADD CONSTRAINT fk3_chmr_weapon FOREIGN KEY (last_accessed_person_id) REFERENCES chmr_person(id);

CREATE OR REPLACE FUNCTION create_default_info_control(_owner_id uuid, _person_id uuid) RETURNS uuid AS $$
DECLARE
	ic_id uuid := gen_random_UUID();
BEGIN
    INSERT INTO chmr_info_control (id, 
									owner_id,
									has_pii, 
									has_phi, 
									security_classification,
									created_datetime, 
									created_person_id,
									last_accessed_datetime,
									last_accessed_person_id)
    VALUES (ic_id,
			_owner_id,
			false,
			false,
			'UNCLASSIFIED',
			now(),
			_person_id,
			now(),
			_person_id);
	
	RETURN ic_id;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE PROCEDURE insert_fileinformation(_owner_id uuid, poc_name varchar(300), filename varchar(2048), person_id uuid)
LANGUAGE plpgsql
AS $$
DECLARE
	cis_id uuid := gen_random_uuid();
	ic_id uuid;
	cnt integer;
BEGIN

	ic_id := create_default_info_control(cis_id, person_id);
	COMMIT;

    INSERT INTO chmr_information_source (id, 
										 title, 
										 poc_name_contact, 
										 inclusion_rationale, 
										 uploaded_file_reference, 
										 information_url, 
										 info_ctrl_id, 
										 owner_id, 
										 created_datetime, 
										 created_person_id, 
										 last_accessed_datetime, 
										 last_accessed_person_id)
    VALUES (cis_id,
			filename,
			poc_name, 
			'chirf provided', 
			filename, 
			null, 
			ic_id, 
			_owner_id, 
			now(),
			person_id,
			now(),
			person_id);
END;
$$;



CREATE OR REPLACE PROCEDURE insert_urlinformation(_owner_id uuid, poc_name varchar(300), url varchar(2083), person_id uuid)
LANGUAGE plpgsql
AS $$
DECLARE
	cis_id uuid := gen_random_uuid();
	ic_id uuid;
	cnt integer;
BEGIN

	ic_id := create_default_info_control(cis_id, person_id);
	COMMIT;

    INSERT INTO chmr_information_source (id, 
										 title, 
										 poc_name_contact, 
										 inclusion_rationale, 
										 uploaded_file_reference, 
										 information_url, 
										 info_ctrl_id, 
										 owner_id, 
										 created_datetime, 
										 created_person_id, 
										 last_accessed_datetime, 
										 last_accessed_person_id)
    VALUES (cis_id,
			url,
			poc_name, 
			'chirf provided', 
			null, 
			url, 
			ic_id, 
			_owner_id, 
			now(),
			person_id,
			now(),
			person_id);
END;
$$;

CREATE OR REPLACE FUNCTION get_person_id(
										_full_name			varchar(128),
										_given_name			varchar(50), 
										_surname				varchar(50),
										_assigned_unit		varchar(50),
										_reporting_unit		varchar(50),
										_dod_id				integer,
										_duty_title			varchar(50),
										_duty_type 			varchar(4),
										_rank				varchar(24),
										_phone_commercial	varchar(16),
										_dsn_phone			varchar(12),
										_email				varchar(320),
										_combatant_command	varchar(16),
										_other_command		varchar(16),
										is_from_public		bool
) RETURNS uuid AS $$
DECLARE
	system_person_name CONSTANT varchar(128) := 'SYSTEM_PERSON';
	pers_id uuid;
BEGIN
	-- if from public: 1. Search for system person
	--                    a. If not found then insert it
	--                    b. If found then use existing
	
	-- SELECT id into pers_id FROM chmr_person 
	-- 	where (is_from_public AND lower(full_name::text) = lower(_full_name) AND 
	-- 				(lower(phone_commercial) = lower(_phone_commercial) OR lower(email) = lower(_email))) OR
	-- 	      (is_from_public = false AND dod_id = _dod_id);

	SELECT id into pers_id FROM chmr_person 
		where (is_from_public AND is_system_user) OR (is_from_public = false AND dod_id = _dod_id);

	IF NOT FOUND THEN
		pers_id := gen_random_UUID();
		
		IF is_from_public THEN
			_full_name := system_person_name; 
			_given_name := '';
			_surname := '';
			_assigned_unit := ''; 
			_reporting_unit := '';
			_dod_id := 0;
			_duty_title := '';
			_duty_type := '';
			_rank := '';
			_phone_commercial := '';
			_dsn_phone := '';
			_email := '';
			_combatant_command := '';
			_other_command := '';
		END IF;
		
		INSERT INTO chmr_person (id, 
								 full_name, 
								 given_name, 
								 surname, 
								 assigned_unit, 
								 reporting_unit, 
								 dod_id, 
								 duty_title, 
								 duty_type, 
								 rank, 
								 phone_commercial, 
								 dsn_phone, 
								 email, 
								 combatant_command, 
								 other_command,
								 is_system_user,
								 group_id,
								 created_datetime, 
								 created_person_id, 
								 last_accessed_datetime, 
								 last_accessed_person_id)
		VALUES (pers_id, 
				_full_name, 
				_given_name, 
				_surname, 
				_assigned_unit, 
				_reporting_unit, 
				_dod_id, 
				_duty_title, 
				_duty_type, 
				_rank, 
				_phone_commercial, 
				_dsn_phone, 
				_email, 
				_combatant_command, 
				_other_command, 
				is_from_public,
				null,
				now(),
				pers_id,
				now(),
				pers_id);
	ELSE
		UPDATE chmr_person
		SET full_name = _full_name, 
			given_name = _given_name, 
			surname = _surname, 
			assigned_unit = _assigned_unit, 
			reporting_unit = _reporting_unit, 
			dod_id = _dod_id, 
			duty_title = _duty_title, 
			duty_type = _duty_type, 
			rank = _rank, 
			phone_commercial = _phone_commercial, 
			dsn_phone = _dsn_phone, 
			email = _email, 
			combatant_command = _combatant_command, 
			other_command = _other_command, 
			last_accessed_datetime = now(),
			last_accessed_person_id = pers_id
		WHERE id = pers_id;
	END IF;
	RETURN pers_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE ingest_ch_intake(_public_report_id		uuid,
											  _full_name			varchar(128),
											  _given_name			varchar(50), 
											  _surname				varchar(50),
											  _assigned_unit		varchar(50),
											  _reporting_unit		varchar(50),
											  _dod_id				integer,
											  _duty_title			varchar(50),
											  _duty_type 			varchar(4),
											  _rank					varchar(24),
											  _phone_commercial		varchar(16),
											  _dsn_phone			varchar(12),
											  _email				varchar(320),
											  _combatant_command	varchar(16),
											  _other_command		varchar(16),
											  _start_datetime       timestamp,
											  _end_datetime         timestamp,
											  _time_zone            varchar(64),
											  _location             varchar(255),
											  _total_harm           text,
											  _us_harm              text,
											  _report_origin		smallint, --0 is public
											  _confidence_level		smallint,
											  _poc1_name			varchar(300),
											  _poc1_info			varchar(500),
											  _poc2_name			varchar(300),
											  _poc2_info			varchar(500),
											  files					varchar(2048)[],
											  _information_url		varchar(2083))
LANGUAGE plpgsql
AS $$
DECLARE
	person_id uuid;
	obs_id uuid := gen_random_UUID();
	report_id uuid := gen_random_UUID();
	fname varchar(2048);
BEGIN
	-- get person id
	person_id := get_person_id(_full_name,
							   _given_name,
							   _surname,
							   _assigned_unit,
							   _reporting_unit,
							   _dod_id,
							   _duty_title,
							   _duty_type ,
							   _rank,
							   _phone_commercial,
							   _dsn_phone,
							   _email,
							   _combatant_command,
							   _other_command,
							   _report_origin = 0);
	COMMIT;

	-- observation information
	INSERT INTO public.chmr_observation(id, 
										 start_datetime, 
										 end_datetime, 
										 time_zone, 
										 location, 
										 total_harm, 
										 us_harm, 
										 deaths_estimate, 
										 deaths_upper_bound, 
										 deaths_lower_bound, 
										 injuries_estimate, 
										 injuries_upper_bound, 
										 injuries_lower_bound, 
										 created_datetime, 
										 created_person_id, 
										 last_accessed_datetime, 
										 last_accessed_person_id)
		VALUES (obs_id, 
				_start_datetime, 
				_end_datetime, 
				_time_zone, 
				_location, 
				_total_harm, 
				_us_harm, 
				0, 
				0, 
				0, 
				0, 
				0, 
				0, 
				now(),
				person_id,
				now(),
				person_id);
 	COMMIT;

	-- report information
	INSERT INTO public.chmr_report (id, 
									public_report_id, 
									report_origin, 
									confidence_level, 
									report_status, 
									reporter_person_id, 
									observation_id, 
									poc1_name, 
									poc1_info, 
									poc2_name, 
									poc2_info, 
									created_datetime, 
									created_person_id, 
									last_accessed_datetime, 
									last_accessed_person_id)
	VALUES (report_id, 
			_public_report_id, 
			_report_origin, 
			_confidence_level, 
			0, -- zero is begining of enum and means 'submitted'
			person_id, 
			obs_id, 
			_poc1_name, 
			_poc1_info, 
			_poc2_name, 
			_poc2_info, 
			now(),
			person_id,
			now(),
			person_id);
	COMMIT;

	-- information sources
	--   files
	IF cardinality(files) > 0 THEN
	    FOREACH fname IN ARRAY files
	    LOOP
			call insert_fileinformation(obs_id, _full_name, fname, person_id);
			COMMIT;
	    END LOOP;
	END IF;

	--    URL
	IF COALESCE(TRIM(_information_url), '') != '' THEN
		call insert_urlinformation(obs_id, _full_name::varchar(300), _information_url::varchar(2083), person_id);
		COMMIT;
	END IF;
END;
$$;


