#!/bin/bash -e

sam build --use-container
sam package --s3-bucket ${bucket_name} --output-template-file packaged.yaml
sam deploy --template-file packaged.yaml --stack-name HelloWorldSkill --capabilities CAPABILITY_IAM
rm packaged.yaml
