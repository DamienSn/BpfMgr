START TRANSACTION;
UPDATE bcns 
INNER JOIN ( SELECT bcn_id, bcn_user_id, bcn_dpt FROM bcns) t2
ON bcns.bcn_id = t2.bcn_id
SET bcn_verification = CONCAT(t2.bcn_user_id, "_", t2.bcn_dpt);
COMMIT;