cd ./cypress
echo $PWD
echo "1) Creating zip files: fixtures.zip, integration.zip"
zip -r -X fixtures.zip fixtures/
zip -r -X integration.zip integration/
echo "- Done"
echo ""
echo "2) Ready to upload files to S3"
echo ""
read -p "  Enter the S3 profile name: " s3_profile
echo ""
echo "3) Uploading S3 files..."
aws s3 cp integration.zip s3://cfpb-hmda-public/prod/cypress/ --profile=${s3_profile}
aws s3 cp fixtures.zip s3://cfpb-hmda-public/prod/cypress/ --profile=${s3_profile}
echo "- Done"

# Cleanup
rm -f fixtures.zip
rm -f integration.zip

cd ..