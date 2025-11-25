cd ./cypress
echo $PWD
echo "1) Creating zip files: fixtures.zip, e2e.zip"
zip -r -X fixtures.zip fixtures/
zip -r -X e2e.zip e2e/
echo "- Done"
echo ""
echo "2) Ready to upload files to S3"
echo ""
read -p "  Enter the S3 profile name: " s3_profile
echo ""
echo "3) Uploading S3 files..."
aws s3 cp e2e.zip s3://cfpb-hmda-public/prod/cypress/ --profile=${s3_profile}
aws s3 cp fixtures.zip s3://cfpb-hmda-public/prod/cypress/ --profile=${s3_profile}
echo "- Done"

# Cleanup
rm -f fixtures.zip
rm -f e2e.zip

cd ..